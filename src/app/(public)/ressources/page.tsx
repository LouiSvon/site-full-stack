import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { LeadMagnetForm } from "@/components/forms/lead-magnet-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ressources",
  description:
    "Guides, templates et ressources gratuites pour développeurs et entrepreneurs.",
};

export default async function RessourcesPage() {
  const resources = await prisma.resource.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">Ressources</h1>
      <p className="mt-4 text-muted-foreground">
        Guides, templates et checklists à télécharger gratuitement.
      </p>

      {resources.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Les ressources arrivent bientôt.
        </p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.id} className="rounded-lg border p-6">
              <Badge variant="secondary">{resource.type}</Badge>
              <h3 className="mt-3 text-lg font-semibold">{resource.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {resource.description}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {(resource.fileSize / 1024 / 1024).toFixed(1)} Mo
              </p>
              <div className="mt-4">
                <LeadMagnetForm resourceId={resource.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
