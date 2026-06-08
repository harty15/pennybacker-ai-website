import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ThemeStudio } from "@/components/layout/theme-studio";
import { ThemeLab } from "@/components/dev/theme-lab";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* live palette + light/dark switcher (ships) */}
      <ThemeStudio />
      {/* token fine-tuner (dev only) */}
      <ThemeLab />
    </div>
  );
}
