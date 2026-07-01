import Link from "next/link";
import type { BlogArticle } from "@/lib/data";
import { ArrowRight, Clock } from "../Icons";

/**
 * Article preview card — shared between the /blog listing grid and the
 * "Related articles" rail on an article page. Kept hook-free (no "use client")
 * so it can render in both server and client contexts.
 */
export default function ArticleCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-teal/10 bg-white p-6 transition-all duration-300 ease-smooth hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-lift active:translate-y-0 active:scale-[0.98]"
    >
      {/* Category pill */}
      <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
        {article.category}
      </span>

      <h3 className="mt-4 break-words font-heading text-xl font-medium leading-snug text-charcoal transition-colors group-hover:text-teal">
        {article.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {article.excerpt}
      </p>

      {/* Meta row: author + read time */}
      <div className="mt-5 flex items-center gap-3 text-xs text-muted">
        <span className="font-medium text-charcoal/80">{article.author}</span>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock width={13} height={13} />
          {article.readTime}
        </span>
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors group-hover:text-coral">
        Read more
        <ArrowRight
          width={16}
          height={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
