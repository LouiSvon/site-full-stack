"use client";

import { useActionState } from "react";
import { createArticle, updateArticle } from "@/actions/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Article } from "@prisma/client";

export function ArticleForm({ article }: { article?: Article }) {
  const action = article
    ? updateArticle.bind(null, article.id)
    : createArticle;

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
        <Input id="title" name="title" required defaultValue={article?.title} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          defaultValue={article?.slug}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={article?.excerpt}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Contenu (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={15}
          className="font-mono text-sm"
          defaultValue={article?.content}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL (optionnel)</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={article?.imageUrl || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={article?.tags.join(", ")}
          placeholder="next.js, react, typescript"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={article?.published}
          className="h-4 w-4"
        />
        <Label htmlFor="published">Publié</Label>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <Button type="submit" disabled={pending}>
        {pending
          ? "Enregistrement..."
          : article
            ? "Mettre à jour"
            : "Créer l'article"}
      </Button>
    </form>
  );
}
