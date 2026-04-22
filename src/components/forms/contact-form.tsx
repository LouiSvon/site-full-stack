"use client";

import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string; success?: boolean } | null, formData: FormData) => {
      return submitContact(formData);
    },
    null
  );

  if (state?.success) {
    return (
      <div className="rounded-lg border bg-muted/40 p-6 text-center">
        <h3 className="text-lg font-semibold">Message envoyé !</h3>
        <p className="mt-2 text-muted-foreground">
          Merci pour votre message. Je vous recontacte sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" required minLength={2} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} required minLength={10} />
      </div>
      {state?.error && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "Envoi en cours..." : "Envoyer"}
      </Button>
    </form>
  );
}
