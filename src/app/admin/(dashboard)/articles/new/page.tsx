import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Nouvel article</h1>
      <ArticleForm />
    </div>
  );
}
