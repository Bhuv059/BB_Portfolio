import type { Metadata } from "next";
import Container from "@/app/components/ui/Container";
import ContactForm from "@/app/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about projects, opportunities, or collaborations.",
};

export default function ContactPage() {
  return (
    <Container className="container" id="contact">
      <section className="contact-section" aria-labelledby="contact-title">
        <p className="label">GET IN TOUCH</p>
        <h1 className="contact-title" id="contact-title">
          Let&apos;s talk about your next idea.
        </h1>
        <p className="contact-description">
          Send me a message and I&apos;ll get back to you as soon as I can.
        </p>
        <ContactForm />
      </section>
    </Container>
  );
}
