import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="text-3xl font-bold">Mentions légales</h1>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p className="mt-3 text-muted-foreground">
          Louis — Développeur web freelance
          <br />
          Micro-entreprise
          <br />
          Email :{" "}
          <a
            href="mailto:contact@louisvon.fr"
            className="underline hover:text-foreground"
          >
            contact@louisvon.fr
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Hébergement</h2>
        <p className="mt-3 text-muted-foreground">
          Vercel Inc.
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, USA
          <br />
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            vercel.com
          </a>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Propriété intellectuelle</h2>
        <p className="mt-3 text-muted-foreground">
          L&apos;ensemble du contenu de ce site (textes, images, code) est la
          propriété exclusive de Louis, sauf mention contraire. Toute
          reproduction est interdite sans autorisation préalable.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Données personnelles</h2>
        <p className="mt-3 text-muted-foreground">
          Les informations collectées via les formulaires de contact sont
          utilisées uniquement pour répondre à vos demandes. Elles ne sont
          jamais cédées à des tiers. Conformément au RGPD, vous disposez d&apos;un
          droit d&apos;accès, de rectification et de suppression de vos données en
          nous contactant par email.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Cookies</h2>
        <p className="mt-3 text-muted-foreground">
          Ce site n&apos;utilise pas de cookies à des fins publicitaires ou de
          traçage. Des cookies techniques strictement nécessaires au
          fonctionnement du site peuvent être utilisés.
        </p>
      </section>
    </div>
  );
}
