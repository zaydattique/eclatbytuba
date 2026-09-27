"use client";

import { useEffect, useState } from "react";

type Settings = {
  payments: {
    cod: { enabled: boolean };
    bank: { enabled: boolean; accountName: string; accountNumber: string; bankName: string };
    stripe: { enabled: boolean; publishableKey: string; secretKey: string };
    jazzcash: { enabled: boolean; merchantId: string; password: string };
    easypaisa: { enabled: boolean; storeId: string; accountNumber: string };
  };
  email: {
    resendApiKey: string;
    fromEmail: string;
    fromName: string;
    orderConfirmation: boolean;
    shippingUpdate: boolean;
    reviewRequest: boolean;
  };
  play: { enabled: boolean; tipText: string };
  pixels: { metaPixelId: string; gaId: string };
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  useEffect(() => {
    fetch(`${base}/api/settings?admin=1`)
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => setError("Could not load settings"));
  }, [base]);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    setMsg("");
    setError("");
    try {
      const res = await fetch(`${base}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSettings(data);
      setMsg("Saved");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="p-4 text-sm text-[#6B5E62]">{error || "Loading settings…"}</div>
    );
  }

  const card = "rounded-[20px] border border-[#F0D6E0] bg-white p-4 shadow-[0_4px_16px_rgba(196,92,122,0.08)]";
  const label = "block text-xs font-medium text-[#6B5E62] mb-1";
  const input =
    "w-full h-10 px-3 rounded-[12px] border border-[#F0D6E0] bg-[#FFF0F5] text-sm text-[#2D2A2B] focus:outline-none focus:ring-2 focus:ring-[#C45C7A]/30";

  return (
    <div className="max-w-2xl space-y-4 pb-24">
      <div>
        <h1 className="text-xl font-semibold text-[#2D2A2B]">Settings</h1>
        <p className="text-sm text-[#6B5E62] mt-0.5">
          Payments, email & play element — change without redeploy
        </p>
      </div>

      {/* Payments */}
      <section className={card}>
        <h2 className="text-sm font-semibold text-[#C45C7A] mb-3">Payment methods</h2>
        <div className="space-y-3">
          {(["cod", "bank", "stripe", "jazzcash", "easypaisa"] as const).map((id) => (
            <label key={id} className="flex items-center gap-2 text-sm text-[#2D2A2B]">
              <input
                type="checkbox"
                checked={(settings.payments as any)[id].enabled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      [id]: { ...(settings.payments as any)[id], enabled: e.target.checked },
                    },
                  })
                }
                className="accent-[#C45C7A]"
              />
              <span className="capitalize font-medium">{id === "cod" ? "Cash on delivery" : id}</span>
            </label>
          ))}
        </div>

        {settings.payments.bank.enabled && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <label className={label}>Bank name</label>
              <input
                className={input}
                value={settings.payments.bank.bankName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      bank: { ...settings.payments.bank, bankName: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={label}>Account name</label>
              <input
                className={input}
                value={settings.payments.bank.accountName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      bank: { ...settings.payments.bank, accountName: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Account number</label>
              <input
                className={input}
                value={settings.payments.bank.accountNumber}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      bank: { ...settings.payments.bank, accountNumber: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {settings.payments.stripe.enabled && (
          <div className="mt-3 grid gap-2">
            <div>
              <label className={label}>Stripe publishable key</label>
              <input
                className={input}
                value={settings.payments.stripe.publishableKey}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      stripe: { ...settings.payments.stripe, publishableKey: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={label}>Stripe secret key</label>
              <input
                type="password"
                className={input}
                value={settings.payments.stripe.secretKey}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      stripe: { ...settings.payments.stripe, secretKey: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {settings.payments.jazzcash.enabled && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <label className={label}>JazzCash merchant ID</label>
              <input
                className={input}
                value={settings.payments.jazzcash.merchantId}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      jazzcash: { ...settings.payments.jazzcash, merchantId: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={label}>JazzCash password</label>
              <input
                type="password"
                className={input}
                value={settings.payments.jazzcash.password}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      jazzcash: { ...settings.payments.jazzcash, password: e.target.value },
                    },
                  })
                }
              />
            </div>
          </div>
        )}

        {settings.payments.easypaisa.enabled && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div>
              <label className={label}>EasyPaisa store ID</label>
              <input
                className={input}
                value={settings.payments.easypaisa.storeId}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      easypaisa: { ...settings.payments.easypaisa, storeId: e.target.value },
                    },
                  })
                }
              />
            </div>
            <div>
              <label className={label}>Account number</label>
              <input
                className={input}
                value={settings.payments.easypaisa.accountNumber}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payments: {
                      ...settings.payments,
                      easypaisa: {
                        ...settings.payments.easypaisa,
                        accountNumber: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </section>

      {/* Email */}
      <section className={card}>
        <h2 className="text-sm font-semibold text-[#C45C7A] mb-3">Email (Resend)</h2>
        <div className="space-y-2">
          <div>
            <label className={label}>API key</label>
            <input
              type="password"
              className={input}
              value={settings.email.resendApiKey}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: { ...settings.email, resendApiKey: e.target.value },
                })
              }
              placeholder="re_… or leave empty for mock"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <label className={label}>From email</label>
              <input
                className={input}
                value={settings.email.fromEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, fromEmail: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className={label}>From name</label>
              <input
                className={input}
                value={settings.email.fromName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, fromName: e.target.value },
                  })
                }
              />
            </div>
          </div>
          {(["orderConfirmation", "shippingUpdate", "reviewRequest"] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 text-sm text-[#2D2A2B]">
              <input
                type="checkbox"
                checked={settings.email[k]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, [k]: e.target.checked },
                  })
                }
                className="accent-[#C45C7A]"
              />
              {k === "orderConfirmation"
                ? "Order confirmation"
                : k === "shippingUpdate"
                  ? "Shipping updates"
                  : "Review request emails"}
            </label>
          ))}
        </div>
      </section>

      {/* Play */}
      <section className={card}>
        <h2 className="text-sm font-semibold text-[#C45C7A] mb-3">Play element</h2>
        <label className="flex items-center gap-2 text-sm text-[#2D2A2B] mb-2">
          <input
            type="checkbox"
            checked={settings.play.enabled}
            onChange={(e) =>
              setSettings({
                ...settings,
                play: { ...settings.play, enabled: e.target.checked },
              })
            }
            className="accent-[#C45C7A]"
          />
          Show cherry tip on storefront
        </label>
        <div>
          <label className={label}>Default tip text</label>
          <input
            className={input}
            value={settings.play.tipText}
            onChange={(e) =>
              setSettings({
                ...settings,
                play: { ...settings.play, tipText: e.target.value },
              })
            }
          />
        </div>
      </section>

      {/* Pixels note */}
      <section className={card}>
        <h2 className="text-sm font-semibold text-[#C45C7A] mb-3">Pixels (optional override)</h2>
        <p className="text-xs text-[#6B5E62] mb-2">
          Env vars NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_GA_ID still work if these are empty.
        </p>
        <div className="grid gap-2">
          <div>
            <label className={label}>Meta Pixel ID</label>
            <input
              className={input}
              value={settings.pixels.metaPixelId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  pixels: { ...settings.pixels, metaPixelId: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className={label}>GA4 Measurement ID</label>
            <input
              className={input}
              value={settings.pixels.gaId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  pixels: { ...settings.pixels, gaId: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 border-t border-[#F0D6E0] bg-white p-3 z-20">
        <div className="max-w-2xl flex items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="h-10 px-5 rounded-[12px] bg-[#C45C7A] text-white text-sm font-semibold disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
          {msg && <span className="text-sm text-green-700">{msg}</span>}
          {error && <span className="text-sm text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}
