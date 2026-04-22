"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") || "",
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    clientName: formData.get("clientName") || "",
    projectUrl: formData.get("projectUrl") || "",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  await prisma.project.create({
    data: {
      ...data,
      imageUrl: data.imageUrl || null,
      clientName: data.clientName || null,
      projectUrl: data.projectUrl || null,
    },
  });

  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") || "",
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    clientName: formData.get("clientName") || "",
    projectUrl: formData.get("projectUrl") || "",
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const data = parsed.data;

  await prisma.project.update({
    where: { id },
    data: {
      ...data,
      imageUrl: data.imageUrl || null,
      clientName: data.clientName || null,
      projectUrl: data.projectUrl || null,
    },
  });

  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
}
