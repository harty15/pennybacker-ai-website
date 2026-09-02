// Augment @types/mdx: remark-mdx-frontmatter exports the YAML frontmatter as `frontmatter`.
declare module "*.mdx" {
  import type { MDXContent } from "mdx/types";
  export const frontmatter: Record<string, unknown>;
  const Content: MDXContent;
  export default Content;
}
