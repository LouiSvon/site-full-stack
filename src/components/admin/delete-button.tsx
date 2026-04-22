"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  label = "Supprimer",
}: {
  action: () => Promise<void>;
  label?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={async () => {
        if (!confirm("Confirmer la suppression ?")) return;
        setPending(true);
        await action();
        setPending(false);
      }}
    >
      {pending ? "..." : label}
    </Button>
  );
}
