import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Création de sites web sur-mesure, performants et optimisés pour la conversion.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">Mes services</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Je conçois des sites web qui ne sont pas juste beaux — ils sont pensés
        pour convertir vos visiteurs en clients.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Site vitrine",
            desc: "Un site professionnel qui reflète votre activité et génère des demandes de contact.",
          },
          {
            title: "Landing page",
            desc: "Une page unique optimisée pour un objectif précis : vente, inscription, prise de rendez-vous.",
          },
          {
            title: "Application web",
            desc: "Un outil sur-mesure pour digitaliser votre activité ou automatiser vos processus.",
          },
        ].map((service) => (
          <div key={service.title} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
          Discutons de votre projet
        </Link>
      </div>
    </div>
  );
}
