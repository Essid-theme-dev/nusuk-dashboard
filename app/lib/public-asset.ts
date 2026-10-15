/** `/public` URLs for subpath deploys (e.g. GitHub Pages). Set in next.config `env`. */
export function publicAssetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
