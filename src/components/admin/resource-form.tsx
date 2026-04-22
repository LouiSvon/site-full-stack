"use client";

import { useActionState } from "react";
import { createResource, updateResource } from "@/actions/ressources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Resource } from "@prisma/client";

export function ResourceForm({ resource }: { resource?: Resource }) {
  const action = resource
    ? updateResource.bind(null, resource.id)
    : createResource;

  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return action(formData);
    },
    null
  );

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          name="title"
          required
          defaultValue={resource?.title}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          defaultValue={resource?.slug}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={resource?.description}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          name="type"
          required
          defaultValue={resource?.type || "PDF"}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
        >
          <option value="PDF">PDF</option>
          <option value="GUIDE">Guide</option>
          <option value="TEMPLATE">Template</option>
          <option value="CHECKLIST">Checklist</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">
          Fichier {resource ? "(laisser vide pour garder l'actuel)" : ""}
        </Label>
        <Input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.zip,.md"
          required={!resource}
        />
        {resource && (
          <p className="text-xs text-muted-foreground">
            Fichier actuel : {(resource.fileSize / 1024 / 1024).toFixed(2)} Mo
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={resource?.published}
          className="h-4 w-4"
        />
        <Label htmlFor="published">Publié</Label>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Enregistrement..."
          : resource
            ? "Mettre à jour"
            : "Créer la ressource"}
      </Button>
    </form>
  );
}
