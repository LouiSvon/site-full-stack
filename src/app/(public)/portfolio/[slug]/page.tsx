import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
  });

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-20">
      <Link
        href="/portfolio"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Retour au portfolio
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
      {project.clientName && (
        <p className="mt-2 text-muted-foreground">
          Client : {project.clientName}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="prose mt-8 max-w-none dark:prose-invert">
        <ReactMarkdown>{project.content}</ReactMarkdown>
      </div>
      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "mt-8")}
        >
          Voir le site
        </a>
      )}
    </article>
  );
}
