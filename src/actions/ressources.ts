"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { resourceSchema } from "@/lib/validations";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Non autorisé");
}

export async function createResource(formData: FormData) {
  await requireAdmin();

  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    type: formData.get("type"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { error: "Un fichier est requis" };
  }

  const blob = await put(`ressources/${parsed.data.slug}/${file.name}`, file, {
    access: "public",
  });

  await prisma.resource.create({
    data: {
      ...parsed.data,
      fileUrl: blob.url,
      fileSize: file.size,
    },
  });

  revalidatePath("/ressources");
  redirect("/admin/ressources");
}

export async function updateResource(id: string, formData: FormData) {
  await requireAdmin();

  const parsed = resourceSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    type: formData.get("type"),
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const existing = await prisma.resource.findUnique({ where: { id } });
  if (!existing) return { error: "Ressource introuvable" };

  let fileUrl = existing.fileUrl;
  let fileSize = existing.fileSize;

  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    // Delete old file
    await del(existing.fileUrl);
    // Upload new one
    const blob = await put(
      `ressources/${parsed.data.slug}/${file.name}`,
      file,
      { access: "public" }
    );
    fileUrl = blob.url;
    fileSize = file.size;
  }

  await prisma.resource.update({
    where: { id },
    data: {
      ...parsed.data,
      fileUrl,
      fileSize,
    },
  });

  revalidatePath("/ressources");
  redirect("/admin/ressources");
}

export async function deleteResource(id: string) {
  await requireAdmin();
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (resource) {
    await del(resource.fileUrl);
    await prisma.resource.delete({ where: { id } });
  }
  revalidatePath("/ressources");
  revalidatePath("/admin/ressources");
}
