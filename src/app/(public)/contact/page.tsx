import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez-moi pour discuter de votre projet web. Réponse sous 24h.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <h1 className="text-3xl font-bold">Me contacter</h1>
      <p className="mt-4 text-muted-foreground">
        Décrivez votre projet en quelques lignes. Je vous réponds sous 24h.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
