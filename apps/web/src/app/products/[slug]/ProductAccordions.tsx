"use client";

import { useState } from "react";

const items = [
  {
    id: "desc",
    title: "Description",
    body: "Soft, glossy, elevated formulas made for everyday self-expression. Product photography is the hero — shade names feel personal and fun.",
  },
  {
    id: "how",
    title: "How to use",
    body: "Apply on clean lips or as directed on the pack. Layer gloss for a soft-shine finish. Perfect for day-to-night looks.",
  },
  {
    id: "ing",
    title: "Ingredients",
    body: "See pack label for full ingredient list. Formulated for comfort and wear. Patch-test if you have sensitive skin.",
  },
  {
    id: "ship",
    title: "Shipping & Returns",
    body: "Cash on delivery available across Pakistan. Easy 7-day returns on unused items. Free shipping on orders over PKR 15,000.",
  },
];

export function ProductAccordions({ description }: { description?: string | null }) {
  const [open, setOpen] = useState<string | null>("desc");

  return (
    <div className="mt-10 divide-y divide-[#F0D6E0] border-t border-[#F0D6E0]">
      {items.map((item) => {
        const isOpen = open === item.id;
        const text =
          item.id === "desc" && description ? description : item.body;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#2D2A2B]"
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              {item.title}
              <span className="text-[#C45C7A]">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-4 text-sm leading-relaxed text-[#6B5E62]">{text}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
