import type { BlogArticle } from "@/lib/data";

/**
 * Placeholder rich-text body. This will be replaced by real MDX / CMS content
 * later — for now it renders representative h2/h3/p/ul/ol/blockquote elements so
 * the article typography hierarchy can be reviewed. Every project using this
 * should treat the copy below as dummy.
 *
 * TODO: replace with real article content (MDX/CMS).
 */
export default function ArticleBody({ article }: { article: BlogArticle }) {
  return (
    <div className="mt-10 space-y-6 break-words text-lg leading-relaxed text-charcoal/85">
      <p>
        {/* TODO: replace with real intro paragraph. */}
        This is placeholder content for “{article.title}”. When our content
        pipeline is in place, this section will hold the real, physiotherapist-
        reviewed article. For now it demonstrates the typography and spacing you
        can expect throughout every post.
      </p>
      <p>
        Every recovery journey is different, but the principles are consistent:
        understand the root cause, load the tissue appropriately, and progress
        with intention. The paragraphs here run at a comfortable reading measure
        so longer articles stay easy on the eyes.
      </p>

      <h2 className="pt-4 font-heading text-2xl font-light text-charcoal sm:text-3xl">
        A section heading (h2)
      </h2>
      <p>
        Section headings break the article into scannable parts. Below is a list
        of things a good rehabilitation plan usually accounts for:
      </p>

      <ul className="list-disc space-y-2 pl-6 marker:text-teal">
        <li>A thorough assessment before any exercise is prescribed.</li>
        <li>Clear, measurable milestones you can track week to week.</li>
        <li>Progressive loading that respects your tissue&apos;s healing timeline.</li>
        <li>Education, so you understand the “why” behind every step.</li>
      </ul>

      <h3 className="pt-2 font-heading text-xl font-medium text-charcoal">
        A sub-heading (h3)
      </h3>
      <p>
        Sub-headings sit under a section to organise detail. Ordered lists work
        well for step-by-step guidance:
      </p>

      <ol className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-teal">
        <li>Start with pain-free range of motion.</li>
        <li>Add controlled strengthening as symptoms settle.</li>
        <li>Reintroduce sport- or task-specific movement.</li>
      </ol>

      <blockquote className="border-l-4 border-teal/40 bg-surface/60 py-4 pl-6 pr-4 font-heading text-xl font-light italic text-charcoal/80">
        “The goal isn&apos;t just to feel better today, it&apos;s to build a body
        that stays better.”
      </blockquote>

      <p>
        {/* TODO: replace with real closing paragraph + call to action. */}
        Ready to put a plan like this into action? Our team builds every
        programme around your specific condition, lifestyle, and goals.
      </p>
    </div>
  );
}
