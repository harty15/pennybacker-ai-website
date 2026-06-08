import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute intro call. Tell us what you're trying to build — or what keeps not getting built.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative z-10 pb-20 pt-28 md:pt-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <ContactInfo />
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
