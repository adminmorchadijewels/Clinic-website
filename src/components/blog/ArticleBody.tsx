import type { BlogArticle } from "@/lib/data";

/**
 * Renders an article's structured body (see ArticleBlock in data.ts) with proper
 * semantic HTML: h2/h3 headings, paragraphs, and bullet lists.
 */
export default function ArticleBody({ article }: { article: BlogArticle }) {
  return (
    <div className="mt-10 space-y-6 break-words text-lg leading-relaxed text-charcoal/85">
      {article.body.map((block, i) => {
        if (block.type === "heading") {
          return block.level === 3 ? (
            <h3
              key={i}
              className="pt-2 font-heading text-xl font-medium text-charcoal"
            >
              {block.content}
            </h3>
          ) : (
            <h2
              key={i}
              className="pt-4 font-heading text-2xl font-light text-charcoal sm:text-3xl"
            >
              {block.content}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-6 marker:text-teal"
            >
              {block.content.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }

        return <p key={i}>{block.content}</p>;
      })}
    </div>
  );
}
