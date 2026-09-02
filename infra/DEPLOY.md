# Deploying pennybacker-ai.com (S3 + CloudFront)

Static site → private **S3** bucket served via **CloudFront**, provisioned with
the CloudFormation template in this folder, deployed by **GitHub Actions** over
OIDC (no stored AWS keys). Everything lives in **us-east-1** (CloudFront certs
must).

## 0. One-time: AWS credentials

Use a **personal AWS account** for this — not Fermi's corporate account.

```bash
aws configure sso            # recommended, or: aws configure --profile pennybacker
export AWS_PROFILE=pennybacker
aws sts get-caller-identity  # confirm you're in the RIGHT account
```

## 1. Provision the infrastructure (Phase 1 — no custom domain yet)

```bash
aws cloudformation deploy \
  --template-file infra/cloudformation.yaml \
  --stack-name pennybacker-site \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides GitHubOrg=harty15 GitHubRepo=pennybacker-ai-website
```

> If the account already has a `token.actions.githubusercontent.com` OIDC
> provider, add `CreateOidcProvider=false` to the parameter overrides.

Read the outputs:

```bash
aws cloudformation describe-stacks --stack-name pennybacker-site \
  --region us-east-1 --query 'Stacks[0].Outputs' --output table
```

## 2. Wire GitHub Actions to AWS (repo variables, not secrets)

Plug the stack outputs into repo variables (`gh` is already authenticated):

```bash
gh variable set AWS_DEPLOY_ROLE_ARN            -R harty15/pennybacker-ai-website -b "<DeployRoleArn>"
gh variable set AWS_S3_BUCKET                  -R harty15/pennybacker-ai-website -b "<BucketName>"
gh variable set AWS_CLOUDFRONT_DISTRIBUTION_ID -R harty15/pennybacker-ai-website -b "<DistributionId>"
```

## 3. First deploy

Push to `main` (or run it manually) and the workflow builds + uploads + invalidates:

```bash
gh workflow run "Deploy site" -R harty15/pennybacker-ai-website
```

The site is now live at the `DistributionDomainName` output (`xxxx.cloudfront.net`).
**Every push to `main` redeploys automatically from here on.**

## 4. Custom domain — pennybacker-ai.com (Phase 2)

DNS is at **Squarespace**, and your email (`ryan@pennybacker-ai.com`) runs on the
same domain — so **keep Squarespace as the nameservers and only ADD records.
Never change nameservers or touch the MX records**, or email breaks.

**a. Request the cert (us-east-1):**

```bash
aws acm request-certificate --region us-east-1 \
  --domain-name pennybacker-ai.com \
  --subject-alternative-names www.pennybacker-ai.com \
  --validation-method DNS \
  --query CertificateArn --output text
```

**b. Get the DNS validation records:**

```bash
aws acm describe-certificate --region us-east-1 --certificate-arn <CERT_ARN> \
  --query 'Certificate.DomainValidationOptions[].ResourceRecord' --output table
```

**c. In Squarespace DNS**, add those **CNAME** validation records. Wait for:

```bash
aws acm wait certificate-validated --region us-east-1 --certificate-arn <CERT_ARN>
```

**d. Attach the domain** by re-running the stack with the cert + domain:

```bash
aws cloudformation deploy \
  --template-file infra/cloudformation.yaml \
  --stack-name pennybacker-site --region us-east-1 --capabilities CAPABILITY_IAM \
  --parameter-overrides GitHubOrg=harty15 GitHubRepo=pennybacker-ai-website \
    DomainName=pennybacker-ai.com AcmCertificateArn=<CERT_ARN>
```

**e. Point DNS at CloudFront (Squarespace):**

- `www` → **CNAME** → `<DistributionDomainName>` (the `xxxx.cloudfront.net` value).
- Apex `pennybacker-ai.com`: Squarespace DNS can't alias an apex to CloudFront,
  so use Squarespace's **domain forwarding** to redirect the root domain to
  `https://www.pennybacker-ai.com`. (i.e. **www is canonical**.)

> Want the bare `pennybacker-ai.com` to be canonical instead? That needs either
> Route 53 (an ALIAS record — but then you must migrate the MX/email records too)
> or fronting with Cloudflare (CNAME flattening). Flag it and I'll set it up.

If we make www canonical, also set `NEXT_PUBLIC_SITE_URL=https://www.pennybacker-ai.com`
in the build (canonical tags / sitemap) — today it defaults to the apex.

## Notes

- **Cost:** S3 pennies + CloudFront (1 TB/mo egress always-free tier) ≈ ~$0–2/mo at this traffic.
- **Rollback / teardown:** `aws cloudformation delete-stack` (empty the bucket first).
- **IaC choice:** CloudFormation for zero state-backend setup. Ask if you'd prefer Terraform or CDK.

## DNS: Route 53 (what's actually live)

Squarespace DNS can't point an apex at CloudFront (no ALIAS), so DNS hosting was
moved to **Route 53** while the domain stays registered at Squarespace.

- **Hosted zone:** `Z027934625TBBC6MRWKEF` (pennybacker-ai.com), in account 942011413954.
- **Records** (see `infra/route53-records.json`): apex + `www` → A **alias** →
  the CloudFront distribution; `MX` → `smtp.google.com`; SPF + Google DKIM TXT
  (replicated from Squarespace so email is unchanged); the two ACM validation CNAMEs.
- **Cutover:** Squarespace → Domain Nameservers → **Use custom nameservers**, set to
  the zone's four `awsdns` nameservers. (DNSSEC left off.)
- **Canonical:** `www` (apex + www both serve; `NEXT_PUBLIC_SITE_URL` defaults to
  `https://www.pennybacker-ai.com`).
- To change records later: edit `infra/route53-records.json` and
  `aws route53 change-resource-record-sets --hosted-zone-id Z027934625TBBC6MRWKEF --change-batch file://infra/route53-records.json`.

## Canonical URLs (SEO)

The CloudFront viewer-request function (`RewriteFunction` in `cloudformation.yaml`)
enforces **one URL per page** so search engines don't split signals across variants:

| Request                                  | Response                                   |
| ---------------------------------------- | ------------------------------------------ |
| `https://pennybacker-ai.com/anything`    | `301 → https://www.pennybacker-ai.com/…`   |
| `https://xxxx.cloudfront.net/anything`   | `301 → https://www.pennybacker-ai.com/…`   |
| `/services/build` (no trailing slash)    | `301 → /services/build/`                   |
| `/services/build/index.html`             | `301 → /services/build/`                   |
| `/services/build/`                       | served from the S3 key `services/build/index.html` |
| anything with a file extension           | passed through unchanged                   |

Every page also emits `<link rel="canonical">` in the www + trailing-slash form
(`lib/seo.ts`), and the sitemap lists the same form. Change the function →
redeploy the stack (`aws cloudformation deploy …` as in step 1/4d); `AutoPublish`
pushes the new code live within a minute or two.

## Generated images without extensions

`app/icon.tsx`, `app/apple-icon.tsx` and the `opengraph-image.tsx` routes are
rendered at build time by `next/og` into **extension-less** files
(`out/icon`, `out/opengraph-image`, `out/work/<slug>/opengraph-image-<hash>`).
The deploy workflow uploads those with `--content-type image/png`; if you add a
new generated image route, add its name to the include/exclude lists in
`.github/workflows/deploy.yml`.
