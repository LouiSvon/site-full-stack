import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Modifier le projet</h1>
      <ProjectForm project={project} />
    </div>
  );
}
