"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Phase 6 — Play element
 * Cherry tip + optional Find Your Shade quiz. Soft Gloss, mobile-first, no Lottie.
 */

const DEFAULT_TIPS = [
  "Try the Rhode Lip Peptide set — a Lahore favourite ✨",
  "Soft gloss is self-care. Treat yourself today 💋",
  "Need a shade match? Browse Lips — nudes to berry.",
];

const SHADE_MAP: Record<
  string,
  { label: string; blurb: string; href: string }
> = {
  soft: {
    label: "Soft nude",
    blurb: "Everyday soft nudes — lip kits & nude polish sets.",
    href: "/products?category=lip-sets",
  },
  rose: {
    label: "Rose blush",
    blurb: "Rose and berry tones for a soft-gloss glow.",
    href: "/products?category=lipstick",
  },
  gloss: {
    label: "High gloss",
    blurb: "Shine-forward gloss, liner & oil rituals.",
    href: "/products?category=lip-gloss",
  },
  glam: {
    label: "Full glam",
    blurb: "Kits for elevated everyday glam.",
    href: "/products?category=cosmetic-kits",
  },
};

export function PlayElement() {
  const [enabled, setEnabled] = useState(true);
  const [tipText, setTipText] = useState("");
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"tip" | "quiz" | "result">("tip");
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tip, setTip] = useState(DEFAULT_TIPS[0]);
  const [result, setResult] = useState<(typeof SHADE_MAP)[string] | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (s?.play) {
          setEnabled(s.play.enabled !== false);
          if (s.play.tipText) {
            setTipText(s.play.tipText);
            setTip(s.play.tipText);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("eclat_play_dismiss") === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setVisible(true), 9000);
    return () => window.clearTimeout(t);
  }, []);

  if (!enabled || dismissed || !visible) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("eclat_play_dismiss", "1");
    } catch {
      /* ignore */
    }
  };

  const openTip = () => {
    setMode("tip");
    setTip(tipText || DEFAULT_TIPS[Math.floor(Math.random() * DEFAULT_TIPS.length)]);
    setOpen(true);
  };

  const pickShade = (key: string) => {
    setResult(SHADE_MAP[key] || SHADE_MAP.soft);
    setMode("result");
    setOpen(true);
  };

  return (
    <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-5">
      {open && (
        <div
          className="max-w-[260px] rounded-[20px] border border-[#F0D6E0] bg-white px-3 py-3 text-sm text-[#2D2A2B] shadow-[0_8px_24px_rgba(196,92,122,0.15)]"
          role="status"
        >
          {mode === "tip" && (
            <>
              <p className="leading-snug">{tip}</p>
              <button
                type="button"
                onClick={() => setMode("quiz")}
                className="mt-2 text-xs font-medium text-[#C45C7A]"
              >
                Find your shade →
              </button>
            </>
          )}
          {mode === "quiz" && (
            <>
              <p className="mb-2 font-medium">What vibe today?</p>
              <div className="flex flex-col gap-1.5">
                {Object.entries(SHADE_MAP).map(([key, v]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => pickShade(key)}
                    className="rounded-[12px] border border-[#F0D6E0] px-2 py-1.5 text-left text-xs hover:bg-[#FFF0F5]"
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </>
          )}
          {mode === "result" && result && (
            <>
              <p className="font-medium text-[#C45C7A]">{result.label}</p>
              <p className="mt-1 text-xs leading-snug text-[#6B5E62]">{result.blurb}</p>
              <Link
                href={result.href}
                className="mt-2 inline-block text-xs font-semibold text-[#C45C7A] underline"
                onClick={dismiss}
              >
                Shop matches
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="mt-2 block text-[11px] text-[#6B5E62] underline"
          >
            Got it
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openTip())}
        aria-label="Éclat play tip"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#F0D6E0] bg-[#FFF0F5] shadow-[0_4px_16px_rgba(196,92,122,0.2)] transition-transform hover:scale-105"
      >
        <CherryIcon />
      </button>
    </div>
  );
}

function CherryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 6c2 4 6 6 8 6"
        stroke="#5B8C5A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 6c-1.5 3-4 5-7 5"
        stroke="#5B8C5A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="11" cy="20" r="7" fill="#C45C7A" />
      <circle cx="21" cy="19" r="6.5" fill="#D47890" />
      <circle cx="9" cy="17" r="1.5" fill="#FFE8F0" opacity="0.7" />
    </svg>
  );
}
