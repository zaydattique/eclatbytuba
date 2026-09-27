"use client";

import { useEffect, useState } from "react";

/**
 * Phase 6 — lightweight play element
 * Cherry SVG mascot + tip bubble. Appears after ~9s. No Lottie, no heavy canvas.
 * Estimated asset size: inline SVG ~1KB.
 */
const TIPS = [
  "Try the Rhode Lip Peptide set — a Lahore favourite ✨",
  "Soft gloss is self-care. Treat yourself today 💋",
  "Need a shade match? Browse Lips — nudes to berry.",
];

export function PlayElement({ tipText }: { tipText?: string }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [tip, setTip] = useState(tipText || TIPS[0]);

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

  useEffect(() => {
    if (tipText) setTip(tipText);
  }, [tipText]);

  if (dismissed || !visible) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("eclat_play_dismiss", "1");
    } catch {
      /* ignore */
    }
  };

  const cycleTip = () => {
    setTip(TIPS[Math.floor(Math.random() * TIPS.length)]);
    setOpen(true);
  };

  return (
    <div className="fixed bottom-20 right-3 z-40 sm:bottom-6 sm:right-5 flex flex-col items-end gap-2">
      {open && (
        <div
          className="max-w-[220px] rounded-[20px] border border-[#F0D6E0] bg-white px-3 py-2 shadow-[0_8px_24px_rgba(196,92,122,0.15)] text-sm text-[#2D2A2B]"
          role="status"
        >
          <p className="leading-snug">{tip}</p>
          <button
            type="button"
            onClick={dismiss}
            className="mt-1 text-[11px] text-[#6B5E62] underline"
          >
            Got it
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={cycleTip}
        aria-label="Éclat tip"
        className="h-12 w-12 rounded-full bg-[#FFF0F5] border border-[#F0D6E0] shadow-[0_4px_16px_rgba(196,92,122,0.2)] flex items-center justify-center hover:scale-105 transition-transform"
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
