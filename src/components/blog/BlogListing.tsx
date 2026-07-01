"use client";

import { useMemo, useState } from "react";
import { BLOG_ARTICLES, BLOG_CATEGORIES } from "@/lib/data";
import BlurText from "../BlurText";
import ArticleCard from "./ArticleCard";

// "All" is a UI-only pseudo-category prepended to the real ones from data.ts.
const FILTERS = ["All", ...BLOG_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

export default function BlogListing() {
  const [active, setActive] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? BLOG_ARTICLES
        : BLOG_ARTICLES.filter((a) => a.category === active),
    [active]
  );

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:pb-28">
      {/* Soft branded glows (purely decorative), matching the About hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-teal-bright/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full bg-coral/10 blur-3xl"
      />

      <div className="container-content relative">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Insights &amp; Advice</p>
          <BlurText
            as="h1"
            text="Move smarter, recover faster"
            className="font-heading text-4xl font-light leading-[1.1] text-charcoal sm:text-5xl lg:text-6xl"
          />
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Evidence-based advice on spine health, knee care, sports recovery,
            and pain management, from the team at Elavive Physio.
          </p>
        </div>

        {/* Category filter buttons */}
        <div
          aria-label="Filter articles by category"
          className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1"
        >
          {FILTERS.map((filter) => {
            const isActive = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(filter)}
                className={`inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                  isActive
                    ? "bg-teal text-white shadow-soft"
                    : "border border-teal/20 text-charcoal/70 hover:border-teal hover:text-teal"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Article grid */}
        <h2 className="sr-only">Latest physiotherapy articles</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-muted">
            No articles in this category yet, check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
