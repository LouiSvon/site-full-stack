import { z } from "zod";

// ─── Contact Form ─────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Lead Magnet ──────────────────────────────────

export const leadMagnetSchema = z.object({
  email: z.string().email("Email invalide"),
  resourceId: z.string().cuid(),
});

export type LeadMagnetFormData = z.infer<typeof leadMagnetSchema>;

// ─── Article (admin) ──────────────────────────────

export const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug invalide"),
  excerpt: z.string().min(10),
  content: z.string().min(50),
  imageUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// ─── Project (admin) ──────────────────────────────

export const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug invalide"),
  description: z.string().min(10),
  content: z.string().min(50),
  imageUrl: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  clientName: z.string().optional().or(z.literal("")),
  projectUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Resource (admin) ─────────────────────────────

export const resourceSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug invalide"),
  description: z.string().min(10),
  type: z.enum(["PDF", "GUIDE", "TEMPLATE", "CHECKLIST"]),
  published: z.boolean().default(false),
});

export type ResourceFormData = z.infer<typeof resourceSchema>;
