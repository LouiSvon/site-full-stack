import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteResource } from "@/actions/ressources";
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

export default async function AdminRessourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ressources</h1>
        <Link
          href="/admin/ressources/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Nouvelle ressource
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Taille</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell>
                <Badge variant="secondary">{resource.type}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {(resource.fileSize / 1024 / 1024).toFixed(2)} Mo
              </TableCell>
              <TableCell className="text-muted-foreground">
                {resource.downloads}
              </TableCell>
              <TableCell>
                <Badge variant={resource.published ? "default" : "secondary"}>
                  {resource.published ? "Publié" : "Brouillon"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/ressources/${resource.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" })
                    )}
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    action={deleteResource.bind(null, resource.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {resources.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Aucune ressource
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
