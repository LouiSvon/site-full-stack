import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/actions/portfolio";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default async function AdminPortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Link
          href="/admin/portfolio/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Nouveau projet
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ordre</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {project.clientName || "—"}
              </TableCell>
              <TableCell>
                <Badge variant={project.published ? "default" : "secondary"}>
                  {project.published ? "Publié" : "Brouillon"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {project.order}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/portfolio/${project.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" })
                    )}
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    action={deleteProject.bind(null, project.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {projects.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Aucun projet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
