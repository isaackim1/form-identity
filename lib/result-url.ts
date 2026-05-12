export function buildSharedResultPath(code: string, resultSlug?: string): string {
  return `/result/${resultSlug ?? code}`;
}

export function buildSharedResultUrl({
  siteUrl,
  code,
  resultSlug,
}: {
  siteUrl: string;
  code: string;
  resultSlug?: string;
}): string {
  return `${siteUrl}${buildSharedResultPath(code, resultSlug)}`;
}
