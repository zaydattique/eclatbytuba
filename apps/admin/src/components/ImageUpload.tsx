"use client";

import { useState } from "react";

interface ImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
}

export function ImageUpload({ value = [], onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const res = await fetch(`${base}/api/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onChange([...value, data.url]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const remove = (url: string) => {
    onChange(value.filter((u) => u !== url));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {value.map((url) => (
          <div key={url} className="relative h-24 w-24 overflow-hidden rounded-md border border-gray-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute right-1 top-1 rounded bg-black/60 px-1.5 text-xs text-white"
            >
              ×
            </button>
          </div>
        ))}
        <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-600">
          {uploading ? "Uploading..." : "+ Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
