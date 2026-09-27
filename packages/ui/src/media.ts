/**
 * Media pipeline helpers
 *
 * Production flow (when Cloudflare R2 / Images or Sharp is connected):
 * 1. Accept upload (JPEG/PNG/WebP/GIF)
 * 2. Validate mime + max size
 * 3. Compress → WebP + AVIF variants
 * 4. Generate responsive widths (320, 640, 960, 1280)
 * 5. Store URLs on ProductImage / Media models
 *
 * Dev: validate + save original; compression deferred (no heavy Sharp dep yet).
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
