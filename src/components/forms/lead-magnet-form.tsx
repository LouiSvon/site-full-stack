"use client";

import { useActionState } from "react";
import { captureLead } from "@/actions/lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LeadMagnetForm({ resourceId }: { resourceId: string }) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return captureLead(formData);
    },
    null
  );

  if (state?.success) {
    return (
      <p className="text-sm font-medium text-green-600">
        Lien de téléchargement envoyé !
      </p>
    );
  }

  return (
    <form action={formAction} className="flex gap-2">
      <input type="hidden" name="resourceId" value={resourceId} />
      <Input
        name="email"
        type="email"
        placeholder="Votre email"
        required
        className="flex-1"
      />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "..." : "Télécharger"}
      </Button>
    </form>
  );
}
