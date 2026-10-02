/**
 * Object storage for product/admin uploads.
 * Production: S3-compatible (Cloudflare R2, AWS S3, MinIO).
 * Local/dev: write under public/uploads when S3 is not configured.
 *
 * Env:
 *   S3_BUCKET
 *   S3_ACCESS_KEY_ID
 *   S3_SECRET_ACCESS_KEY
 *   S3_ENDPOINT          (R2: https://<accountid>.r2.cloudflarestorage.com)
 *   S3_REGION            (default auto / us-east-1)
 *   S3_PUBLIC_URL        (CDN/public base, e.g. https://media.example.com)
 *   S3_FORCE_PATH_STYLE  ("true" for MinIO/R2 path-style)
 */

import { writeFile, mkdir } from "fs/promises";
import path from "path";

export type UploadResult = {
  url: string;
  key: string;
  storage: "s3" | "local";
};

export function isObjectStorageConfigured(): boolean {
  return Boolean(
    process.env.S3_BUCKET?.trim() &&
      process.env.S3_ACCESS_KEY_ID?.trim() &&
      process.env.S3_SECRET_ACCESS_KEY?.trim()
  );
}

function publicUrlForKey(key: string): string {
  const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
  if (base) return `${base}/${key}`;
  const bucket = process.env.S3_BUCKET!;
  const endpoint = process.env.S3_ENDPOINT?.replace(/\/$/, "");
  if (endpoint) return `${endpoint}/${bucket}/${key}`;
  return `https://${bucket}.s3.amazonaws.com/${key}`;
}

async function putS3(opts: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<UploadResult> {
  // Dynamic import so local-only deploys without the SDK still work at typecheck time
  // when dependency is present on the app that uploads.
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const region = process.env.S3_REGION || "auto";
  const endpoint = process.env.S3_ENDPOINT?.trim() || undefined;
  const forcePathStyle =
    process.env.S3_FORCE_PATH_STYLE === "true" || Boolean(endpoint);

  const client = new S3Client({
    region,
    endpoint,
    forcePathStyle,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return {
    key: opts.key,
    url: publicUrlForKey(opts.key),
    storage: "s3",
  };
}

async function putLocal(opts: {
  key: string;
  body: Buffer;
}): Promise<UploadResult> {
  const filename = path.basename(opts.key);
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), opts.body);

  const webBase = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "";
  const url = webBase ? `${webBase}/uploads/${filename}` : `/uploads/${filename}`;
  return { key: opts.key, url, storage: "local" };
}

export async function uploadImageBuffer(opts: {
  buffer: Buffer;
  filename: string;
  contentType: string;
  folder?: string;
}): Promise<UploadResult> {
  const safeName = opts.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const folder = (opts.folder || "uploads").replace(/^\/+|\/+$/g, "");
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  if (isObjectStorageConfigured()) {
    return putS3({
      key,
      body: opts.buffer,
      contentType: opts.contentType,
    });
  }

  return putLocal({ key, body: opts.buffer });
}
