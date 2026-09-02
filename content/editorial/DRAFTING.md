# Drafting brief for the Insights routine

You are drafting one Insights post for pennybacker-ai.com. You never publish;
a human merges. Work in this order and stop when the pull request is open.

1. **Pick the topic.** Read `content/editorial/queue.yaml`. Take the first
   item with `status: queued`. Set its status to `drafting` in the same change.
2. **Read the rules.** `content/editorial/STYLE.md` is binding. Read the two
   most recent files in `content/posts/` to match the voice and structure.
3. **Ground it.** Read the relevant service page copy in `content/` and the
   matching case study in `content/work.ts`. Research the target query: what
   currently ranks, what it gets wrong, which primary sources exist. Cite
   primary sources only.
4. **Write** `content/posts/<slug>.mdx` with frontmatter:
   `title`, `description`, `date` (today), `author` (from the queue item),
   `tags` (from `TAG_LABELS` in `lib/posts.ts`), `pillar`, `draft: true`.
   1,200 to 2,000 words. One table or config block that could only come from
   doing the work. A "what breaks" section. Two or more internal links.
5. **Check it builds.** Run `npm ci` and `INSIGHTS_INCLUDE_DRAFTS=1 npm run build`.
   The build must pass and `out/insights/<slug>/index.html` must exist. Leave
   `draft: true` in the file; the environment variable is what includes it.
6. **Open the pull request** on a branch named `insights/<slug>` with the title
   `Insights draft: <post title>`. The description contains:
   - a three-sentence summary of the post,
   - a list of every factual claim the reviewer should verify,
   - a confidentiality note confirming no client is identifiable,
   - a LinkedIn post (120 to 200 words, no hashtags spam, one link) for each
     founder to share once published,
   - the merge checklist from STYLE.md.
7. **Stop.** Do not merge, do not touch other posts, do not change site code.
   If the queue is empty, open an issue titled "Insights queue is empty" that
   proposes five topics per pillar with target queries.
