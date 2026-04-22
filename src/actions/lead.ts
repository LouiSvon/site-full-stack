"use server";

import { prisma } from "@/lib/prisma";
import { leadMagnetSchema } from "@/lib/validations";

export async function captureLead(formData: FormData) {
  const parsed = leadMagnetSchema.safeParse({
    email: formData.get("email"),
    resourceId: formData.get("resourceId"),
  });

  if (!parsed.success) {
    return { error: "Email invalide" };
  }

  const { email, resourceId } = parsed.data;

  // Always respond success to prevent email enumeration
  await prisma.lead.create({
    data: {
      email,
      resourceId,
      source: "LEAD_MAGNET",
    },
  });

  // Increment download counter
  await prisma.resource.update({
    where: { id: resourceId },
    data: { downloads: { increment: 1 } },
  });

  return { success: true };
}
