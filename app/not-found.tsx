import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center">
      <Container className="text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="mt-4 text-h1">This span doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-lead text-muted">
          The page you&apos;re looking for was moved or never built. Head back to solid ground.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button href="/">Home</Button>
          <Button href="/contact" variant="secondary">
            Book an intro call
          </Button>
        </div>
      </Container>
    </main>
  );
}
