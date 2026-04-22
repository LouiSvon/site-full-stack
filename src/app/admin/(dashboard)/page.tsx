import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const [leadCount, articleCount, projectCount, resourceCount] =
    await Promise.all([
      prisma.lead.count(),
      prisma.article.count(),
      prisma.project.count(),
      prisma.resource.count(),
    ]);

  const stats = [
    { label: "Leads", value: leadCount },
    { label: "Articles", value: articleCount },
    { label: "Projets", value: projectCount },
    { label: "Ressources", value: resourceCount },
  ];

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
