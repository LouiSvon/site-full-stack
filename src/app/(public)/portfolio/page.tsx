import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Découvrez mes réalisations web : sites vitrines, applications et landing pages.",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">Portfolio</h1>
      <p className="mt-4 text-muted-foreground">
        Quelques projets récents qui illustrent mon approche.
      </p>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Les projets arrivent bientôt.
        </p>
      ) : (
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group rounded-lg border p-6 transition-colors hover:bg-muted/40"
            >
              <h3 className="text-lg font-semibold group-hover:underline">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
