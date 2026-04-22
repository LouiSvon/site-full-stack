"use client";

import { useActionState } from "react";
import { createProject, updateProject } from "@/actions/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Project } from "@prisma/client";

export function ProjectForm({ project }: { project?: Project }) {
  const action = project
    ? updateProject.bind(null, project.id)
    : createProject;

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
        <Input id="title" name="title" required defaultValue={project?.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          defaultValue={project?.slug}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description courte</Label>
        <Textarea
          id="description"
          name="description"
          required
          rows={2}
          defaultValue={project?.description}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenu détaillé (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={10}
          className="font-mono text-sm"
          defaultValue={project?.content}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optionnel)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={project?.imageUrl || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={project?.tags.join(", ")}
          placeholder="next.js, e-commerce, tailwind"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="clientName">Nom du client (optionnel)</Label>
        <Input
          id="clientName"
          name="clientName"
          defaultValue={project?.clientName || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectUrl">URL du projet (optionnel)</Label>
        <Input
          id="projectUrl"
          name="projectUrl"
          type="url"
          defaultValue={project?.projectUrl || ""}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={project?.published}
          className="h-4 w-4"
        />
        <Label htmlFor="published">Publié</Label>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Enregistrement..."
          : project
            ? "Mettre à jour"
            : "Créer le projet"}
      </Button>
    </form>
  );
}
