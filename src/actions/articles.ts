"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { articleSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function createArticle(formData: FormData) {
  await requireAdmin();

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") || "",
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  await prisma.article.create({
    data: {
      ...data,
      imageUrl: data.imageUrl || null,
      publishedAt: data.published ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") || "",
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;
  const existing = await prisma.article.findUnique({ where: { id } });

  await prisma.article.update({
    where: { id },
    data: {
      ...data,
      imageUrl: data.imageUrl || null,
      publishedAt:
        data.published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });

  revalidatePath("/blog");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/articles");
}
