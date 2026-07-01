/**
 * Truncate a review (or any text) to `maxLength` characters, cutting at the
 * nearest word boundary before the limit and appending an ellipsis. Short text
 * is returned unchanged.
 */
export function truncateReview(text: string, maxLength = 300): string {
  if (text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
}
