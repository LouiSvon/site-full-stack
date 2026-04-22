"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { contactSchema } from "@/lib/validations";

export async function submitContact(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Données invalides" };
  }

  const { name, email, message } = parsed.data;

  await prisma.lead.create({
    data: {
      email,
      name,
      message,
      source: "CONTACT_FORM",
    },
  });

  await resend.emails.send({
    from: "Contact <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL!,
    subject: `Nouveau contact : ${name}`,
    text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  return { success: true };
}
