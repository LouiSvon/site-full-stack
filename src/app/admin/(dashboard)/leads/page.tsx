import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const sourceLabels: Record<string, string> = {
  CONTACT_FORM: "Contact",
  LEAD_MAGNET: "Ressource",
  NEWSLETTER: "Newsletter",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Leads</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.email}</TableCell>
              <TableCell>{lead.name || "—"}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {sourceLabels[lead.source] || lead.source}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate text-muted-foreground">
                {lead.message || "—"}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {lead.createdAt.toLocaleDateString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
          {leads.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Aucun lead
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
