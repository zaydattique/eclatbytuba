/**
 * Media pipeline helpers — Phase 3
 *
 * Production flow (when Cloudflare R2 / Images or Sharp is connected):
 * 1. Accept upload (JPEG/PNG/WebP/GIF)
 * 2. Validate mime + max size (e.g. 8MB)
 * 3. Compress → WebP + AVIF variants
 * 4. Generate responsive widths (320, 640, 960, 1280)
 * 5. Store URLs on ProductImage / Media models
 */

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8MB

export function isAllowedImageType(mime: string): boolean {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(mime);
}

export function validateImageFile(file: { type: string; size: number }): string | null {
  if (!isAllowedImageType(file.type)) return "Only JPEG, PNG, WebP, GIF allowed";
  if (file.size > MAX_UPLOAD_BYTES) return "File too large (max 8MB)";
  return null;
}

export const IMAGE_WIDTHS = [320, 640, 960, 1280, 1600] as const;
