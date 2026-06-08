import { Hero } from "@/components/sections/hero";
import { StatBand } from "@/components/sections/stat-band";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { FailCards } from "@/components/sections/fail-cards";
import { MethodSteps } from "@/components/sections/method-steps";
import { ProofGrid } from "@/components/sections/proof-grid";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBand />
      <ServicesGrid />
      <WhoWeServe />
      <FailCards />
      <MethodSteps />
      <ProofGrid />
      <CtaBanner
        heading="Have a workflow that should be automated by now?"
        body="Tell us what you're trying to build — or what keeps not getting built. Intro calls are 30 minutes and useful even if we never work together."
      />
    </>
  );
}
