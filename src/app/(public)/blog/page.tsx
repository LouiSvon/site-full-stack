import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles et guides sur le développement web, le freelancing et les bonnes pratiques.",
};

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">Blog</h1>
      <p className="mt-4 text-muted-foreground">
        Articles, guides et retours d&apos;expérience sur le développement web.
      </p>

      {articles.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          Les articles arrivent bientôt.
        </p>
      ) : (
        <div className="mt-12 space-y-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="block rounded-lg border p-6 transition-colors hover:bg-muted/40"
            >
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {article.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
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
