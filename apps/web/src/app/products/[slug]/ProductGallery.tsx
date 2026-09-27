"use client";

import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const list = images?.length ? images : [];
  const [active, setActive] = useState(0);
  const src = list[active];

  return (
    <div className="space-y-3">
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-[#FFE8F0]"
        style={{
          boxShadow:
            "0 4px 20px rgba(196, 92, 122, 0.08), 0 1px 3px rgba(196, 92, 122, 0.04)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#6B5E62]">
            Image coming soon
          </div>
        )}
        {list.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm text-[#2D2A2B] shadow"
              onClick={() => setActive((i) => (i - 1 + list.length) % list.length)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm text-[#2D2A2B] shadow"
              onClick={() => setActive((i) => (i + 1) % list.length)}
            >
              ›
            </button>
          </>
        )}
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((url, i) => (
            <button
              key={url + i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-[12px] border-2 ${
                i === active ? "border-[#C45C7A]" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
