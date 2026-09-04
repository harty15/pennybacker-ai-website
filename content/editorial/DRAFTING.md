# Drafting

The drafting routine and the agents it dispatches live in the Pennybacker-Home vault:
`2-Areas/content/routines/draft-article.md` and `/.claude/agents/`. This repo only needs to know the
contract they rely on:

- A post is `content/posts/<slug>.mdx` with the frontmatter `STYLE.md` prescribes; `draft: true` until a
  partner flips it in the pull request.
- `INSIGHTS_INCLUDE_DRAFTS=1 npm run build` must pass before a pull request opens.
- Figures are components in `components/mdx/diagrams/<slug>.tsx` built on `primitives.tsx`.
- Images are `public/insights/<slug>/hero.webp` (+ `hero.jpg` for the share image) and spot images beside
  it, produced by `scripts/illustrate.mjs`; the frontmatter carries `hero` and `heroAlt`.
- Pull requests carry the fact-check verdict, the merge checklist from `STYLE.md`, and the LinkedIn drafts.
