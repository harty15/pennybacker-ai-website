# Insights style guide

Who reads this: Ryan, Max, and the drafting agent. Every post must pass this
before a human merges it. If a rule here conflicts with a good post, the post
wins — but say so in the pull request.

## Who we are writing for

Operators and the people who advise them: a project controls lead on a
megaproject, a COO of an industrial services company, a partner at a family
office, a VP Engineering adding AI to a product. They are smart, busy, and
allergic to hype. They have sat through the deck. They want to know what
actually happens when the thing meets real data, real permissions, and real
people.

## Voice

- **Operator-plain.** Short sentences. Concrete nouns. Say "the ERP", "the
  transmittal log", "the revision", not "enterprise data assets".
- **Specific over clever.** One real mechanism beats three metaphors. The
  bridge metaphor is the firm's; use it at most once per post, if at all.
- **First person plural, lightly.** "We" is the firm. Say what we did and what
  we would do differently. No royal we, no "at Pennybacker we believe".
- **No hype words.** Not: revolutionary, game-changing, unlock, seamless,
  leverage (verb), journey, supercharge, cutting-edge, robust (unless about a
  bridge). Not: "in today's fast-paced world".
- **No throat-clearing.** The first paragraph states the problem or the claim.
  No "In this post we will".
- **Honest about failure.** Every post has a "what breaks" section or its
  equivalent. If AI is the wrong tool for part of the problem, say so.
- **Numbers are real or absent.** Use the firm's published figures (5,000+
  documents, 15+ enterprise systems, 7+ production MCP servers, 745 exhibits /
  11,500+ pages) at capability level. Never invent client metrics, names, or
  outcomes. Never name a client that the site anonymizes.

## Shape

- **Length:** 1,200 to 2,000 words. Cornerstone posts may run to 2,500.
- **Title:** says what the reader gets; contains the phrase they would search.
  Under 70 characters. Sentence case.
- **Description:** one or two sentences, 140 to 160 characters, the search
  snippet. States the problem and the payoff.
- **Structure:** H2 sections a reader can skim; H3 only inside a long H2. One
  table or one code/config block that could only come from doing the work. A
  closing section that names the next decision the reader has to make.
- **Internal links:** at least two, to the relevant service page and case
  study, placed where they are useful, not in a pile at the end.
- **External sources:** link primary sources (specs, vendor docs, standards)
  when you cite them. No links to competitors' marketing.
- **No images required.** The share image is generated. If a diagram would
  help, describe it in the PR and a human decides.

## MDX rules

- Frontmatter fields: `title`, `description`, `date` (YYYY-MM-DD), `author`
  (`ryan` or `max`), `tags` (from `lib/posts.ts` TAG_LABELS), `pillar` (from
  `queue.yaml`), `draft: true` until a human flips it.
- Plain Markdown plus GFM tables. No raw `<`, `{` or `}` in prose — spell out
  "under 5 percent" and escape braces in code with backticks.
- Slug = file name = kebab-case of the title's key phrase, stable forever.

## Confidentiality

Client work is described at the capability and architecture level only:
what kind of system, what it connects to, what changed for the people using
it. No client names, contract values, internal system names, or anything
that identifies a project until Ryan clears it in writing. When in doubt,
generalize.

## Before merge (human checklist)

- [ ] Every factual claim is something we know to be true.
- [ ] Nothing identifies a client.
- [ ] Title and description read like a search result we would click.
- [ ] At least two internal links; no dead links.
- [ ] `npm run build` passes; the post renders in `next dev` with the share image.
- [ ] `draft: false`, `date` is the publish date.
