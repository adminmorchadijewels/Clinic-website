import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleCard from "@/components/blog/ArticleCard";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import { ArrowRight, Calendar, Clock } from "@/components/Icons";
import { BLOG_ARTICLES, getArticle, getRelatedArticles } from "@/lib/data";

// Pre-render every seed article at build time.
export function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };

  // Bare title string → the "%s | Elavive Physio" template in layout.tsx
  // appends the brand, giving "<Title> | Elavive Physio".
  const brandedTitle = `${article.title} | Elavive Physio`;
  // `article.date` is a human-readable string (e.g. "24 June 2026"); coerce to
  // an ISO timestamp for the OpenGraph publishedTime when it parses cleanly.
  const parsedDate = new Date(article.date);
  const publishedTime = Number.isNaN(parsedDate.getTime())
    ? undefined
    : parsedDate.toISOString();

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    // TODO: Remove robots noindex once real blog content replaces the placeholder article bodies
    robots: { index: false, follow: true },
    openGraph: {
      title: brandedTitle,
      description: article.excerpt,
      url: `https://www.elavivephysio.com/blog/${article.slug}`,
      type: "article",
      publishedTime,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elavivephysio.com" },
          { name: "Blog", url: "https://www.elavivephysio.com/blog" },
          {
            name: article.title,
            url: `https://www.elavivephysio.com/blog/${article.slug}`,
          },
        ]}
      />
      <Header />
      <main>
        <article className="px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-2xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-coral"
            >
              <span aria-hidden="true">←</span> Back to all articles
            </Link>

            {/* Header */}
            <header className="mt-8">
              <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                {article.category}
              </span>
              <h1 className="mt-5 font-heading text-3xl font-light leading-[1.15] text-charcoal sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              {/* Byline */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
                <div className="flex items-center gap-3">
                  {/* Avatar placeholder — initials on a teal disc. */}
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-full bg-teal/15 font-heading text-sm font-medium text-teal"
                  >
                    AA
                  </span>
                  <span className="font-medium text-charcoal">
                    {article.author}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar width={14} height={14} />
                  {article.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock width={14} height={14} />
                  {article.readTime}
                </span>
              </div>
            </header>

            {/* Body */}
            <ArticleBody article={article} />

            {/* End-of-article booking CTA card */}
            <aside className="mt-14 overflow-hidden rounded-3xl bg-teal px-6 py-10 text-center sm:px-10">
              <h2 className="font-heading text-2xl font-light text-white sm:text-3xl">
                Ready to move without pain?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-white/80">
                Book an appointment with Dr. Ajay Agarwal and get a plan built
                around your recovery.
              </p>
              <Link
                href="/contact#booking"
                className="btn-primary mt-7 focus-visible:outline-white"
              >
                Book an appointment
                <ArrowRight width={18} height={18} />
              </Link>
            </aside>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="section-padding">
            <div className="container-content">
              <h2 className="mb-8 font-heading text-2xl font-light text-charcoal sm:text-3xl">
                Related articles
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
