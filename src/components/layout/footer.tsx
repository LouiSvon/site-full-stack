import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>&copy; {new Date().getFullYear()} Louis. Tous droits réservés.</p>
        <nav className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-foreground">
            Mentions légales
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
