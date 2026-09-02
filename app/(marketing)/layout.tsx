import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ThemeStudio } from "@/components/layout/theme-studio";
import { ThemeLab } from "@/components/dev/theme-lab";
import { getAllPosts } from "@/lib/posts";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showInsights = (await getAllPosts()).length > 0;
  return (
    <div className="flex min-h-screen flex-col">
      <Nav showInsights={showInsights} />
      <main className="flex-1">{children}</main>
      <Footer showInsights={showInsights} />
      {/* live palette + light/dark switcher (ships) */}
      <ThemeStudio />
      {/* token fine-tuner (dev only) */}
      <ThemeLab />
    </div>
  );
}
