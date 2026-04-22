import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ResourceForm } from "@/components/admin/resource-form";

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resource = await prisma.resource.findUnique({ where: { id } });
  if (!resource) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Modifier la ressource</h1>
      <ResourceForm resource={resource} />
    </div>
  );
}
