/**
 * Media pipeline helpers
 *
 * Dev / current: validate mime + max size, store original under public/uploads.
 * Production (Cloudflare Images or Sharp on worker):
 * 1. Accept upload (JPEG/PNG/WebP/GIF)
 * 2. validateImageFile
 * 3. Compress → WebP + AVIF variants
 * 4. Responsive widths IMAGE_WIDTHS
 * 5. Persist URLs on Product.images
 *
 * Sharp is intentionally not added as a monorepo dep (bundle/perf cost).
 * Prefer Cloudflare Images transforms in production instead.
 */

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB

export function isAllowedImageType(mime: string): boolean {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(mime);
}

export function validateImageFile(file: { type: string; size: number }): string | null {
  if (!isAllowedImageType(file.type)) return "Only JPEG, PNG, WebP, GIF allowed";
  if (file.size > MAX_UPLOAD_BYTES) return "File too large (max 5MB)";
  return null;
}

export const IMAGE_WIDTHS = [320, 640, 960, 1280, 1600] as const;

/** Hint for CDN transform query strings when using Cloudflare Images. */
export function cfImageUrl(path: string, width: number): string {
  if (!path) return path;
  if (path.startsWith("/uploads")) return path;
  return path;
}
