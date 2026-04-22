import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/ressources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages, ...projectPages];
}
