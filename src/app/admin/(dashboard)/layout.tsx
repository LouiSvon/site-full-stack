import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/ressources", label: "Ressources" },
  { href: "/admin/leads", label: "Leads" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-6">
        <h2 className="mb-8 text-lg font-semibold">Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form
          className="mt-auto pt-8"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <Button variant="outline" size="sm" className="w-full">
            Déconnexion
          </Button>
        </form>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
