import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteArticle } from "@/actions/articles";
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

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link
          href="/admin/articles/new"
          className={cn(buttonVariants({ size: "sm" }))}
        >
          Nouvel article
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell className="text-muted-foreground">
                {article.slug}
              </TableCell>
              <TableCell>
                <Badge variant={article.published ? "default" : "secondary"}>
                  {article.published ? "Publié" : "Brouillon"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {article.createdAt.toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" })
                    )}
                  >
                    Modifier
                  </Link>
                  <DeleteButton
                    action={deleteArticle.bind(null, article.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {articles.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Aucun article
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
