import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-20">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Retour au blog
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{article.title}</h1>
      {article.publishedAt && (
        <p className="mt-2 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "long",
          }).format(article.publishedAt)}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="prose mt-8 max-w-none dark:prose-invert">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}
