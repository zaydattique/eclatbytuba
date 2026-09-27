"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SESSION_KEY = "eclat_sid";
const START_KEY = "eclat_session_start";

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      sessionStorage.setItem(SESSION_KEY, id);
      sessionStorage.setItem(START_KEY, String(Date.now()));
    }
    return id;
  } catch {
    return `s_${Date.now()}`;
  }
}

function utm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    source: p.get("utm_source") || undefined,
    medium: p.get("utm_medium") || undefined,
    campaign: p.get("utm_campaign") || undefined,
  };
}

function deviceType() {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  return "desktop";
}

export function trackEvent(
  type: string,
  props?: Record<string, unknown>,
  extra?: { durationMs?: number; engaged?: boolean }
) {
  if (typeof window === "undefined") return;
  const sessionId = getSessionId();
  const payload = {
    type,
    sessionId,
    path: window.location.pathname,
    props,
    device: deviceType(),
    ...utm(),
    ...extra,
  };
  try {
    // GA4
    const w = window as any;
    if (typeof w.gtag === "function") {
      w.gtag("event", type, props || {});
    }
    // Meta
    if (typeof w.fbq === "function") {
      w.fbq("trackCustom", type, props || {});
    }
  } catch {}
  // First-party
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export function AnalyticsBeacon() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const engagedRef = useRef(false);

  useEffect(() => {
    getSessionId();
    trackEvent("page_view");

    const onEngage = () => {
      engagedRef.current = true;
    };
    window.addEventListener("scroll", onEngage, { once: true, passive: true });
    window.addEventListener("click", onEngage, { once: true });

    const start = Number(sessionStorage.getItem(START_KEY) || Date.now());

    const onLeave = () => {
      const durationMs = Date.now() - start;
      trackEvent("session_end", undefined, {
        durationMs,
        engaged: engagedRef.current || durationMs >= 10000,
      });
      if (engagedRef.current) {
        trackEvent("engagement", undefined, { durationMs });
      }
    };

    window.addEventListener("pagehide", onLeave);
    return () => {
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("scroll", onEngage);
      window.removeEventListener("click", onEngage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  return null;
}
