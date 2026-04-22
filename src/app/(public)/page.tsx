import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Des sites web qui convertissent
          <br />
          <span className="text-muted-foreground">vos visiteurs en clients</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Développeur web freelance, je conçois des sites performants et
          sur-mesure pour les entrepreneurs qui veulent se démarquer en ligne.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Réserver un appel gratuit
          </Link>
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Voir mes réalisations
          </Link>
        </div>
      </section>

      {/* Problème */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Votre site ne vous apporte pas de clients ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            La plupart des sites vitrines sont de belles cartes de visite
            digitales. Mais une carte de visite ne vend pas. Un site pensé pour
            convertir, si.
          </p>
        </div>
      </section>

      {/* Processus */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-12 text-center text-2xl font-bold sm:text-3xl">
          Comment ça marche
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "On échange",
              desc: "Un appel gratuit pour comprendre vos objectifs et votre audience.",
            },
            {
              step: "2",
              title: "Je conçois",
              desc: "Design et développement de votre site, optimisé pour la conversion.",
            },
            {
              step: "3",
              title: "Vous convertissez",
              desc: "Votre site travaille pour vous, 24h/24, en attirant et convertissant des prospects.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Prêt à transformer votre présence en ligne ?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Réservez un appel gratuit de 30 minutes. On discute de votre projet,
            sans engagement.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            Réserver mon appel gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
