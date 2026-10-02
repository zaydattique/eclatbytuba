/**
 * Store settings — payments + email + play element
 * Durable via Prisma Setting model when DATABASE_URL is set.
 * In-memory only when no database (local demo).
 * Secrets never returned on public GET.
 *
 * Pakistan-first payments:
 * - COD, Bank Transfer, JazzCash, EasyPaisa enabled by default
 * - Generic "customGateway" slot for any PK third-party provider
 * - Stripe kept as disabled placeholder only
 */

import { useDb } from "./db-mode";

export type PaymentMethodId =
  | "cod"
  | "bank"
  | "jazzcash"
  | "easypaisa"
  | "customGateway"
  | "stripe";

export type StoreSettings = {
  payments: {
    cod: { enabled: boolean };
    bank: {
      enabled: boolean;
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
    jazzcash: { enabled: boolean; merchantId: string; password: string };
    easypaisa: { enabled: boolean; storeId: string; accountNumber: string };
    customGateway: {
      enabled: boolean;
      providerName: string;
      merchantId: string;
      apiKey: string;
      webhookSecret: string;
      checkoutUrl: string;
      instructions: string;
    };
    stripe: { enabled: boolean; publishableKey: string; secretKey: string };
  };
  email: {
    resendApiKey: string;
    fromEmail: string;
    fromName: string;
    orderConfirmation: boolean;
    shippingUpdate: boolean;
    reviewRequest: boolean;
  };
  play: {
    enabled: boolean;
    tipText: string;
  };
  pixels: {
    metaPixelId: string;
    gaId: string;
  };
};

const SETTINGS_KEY = "store";

const DEFAULTS: StoreSettings = {
  payments: {
    cod: { enabled: true },
    bank: {
      enabled: true,
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
    jazzcash: { enabled: true, merchantId: "", password: "" },
    easypaisa: { enabled: true, storeId: "", accountNumber: "" },
    customGateway: {
      enabled: false,
      providerName: "",
      merchantId: "",
      apiKey: "",
      webhookSecret: "",
      checkoutUrl: "",
      instructions:
        "Pay via the linked gateway. We will confirm your order after payment.",
    },
    stripe: { enabled: false, publishableKey: "", secretKey: "" },
  },
  email: {
    resendApiKey: "",
    fromEmail: "orders@eclatbytuba.store",
    fromName: "Éclat by Tuba",
    orderConfirmation: true,
    shippingUpdate: true,
    reviewRequest: true,
  },
  play: {
    enabled: true,
    tipText: "Try the Rhode Lip Peptide set — a Lahore favourite ✨",
  },
  pixels: {
    metaPixelId: "",
    gaId: "",
  },
};

let memStore: StoreSettings = structuredClone(DEFAULTS);

function mergeSettings(
  base: StoreSettings,
  partial: Partial<StoreSettings>
): StoreSettings {
  return {
    ...base,
    ...partial,
    payments: partial.payments
      ? {
          cod: { ...base.payments.cod, ...partial.payments.cod },
          bank: { ...base.payments.bank, ...partial.payments.bank },
          jazzcash: {
            ...base.payments.jazzcash,
            ...partial.payments.jazzcash,
          },
          easypaisa: {
            ...base.payments.easypaisa,
            ...partial.payments.easypaisa,
          },
          customGateway: {
            ...base.payments.customGateway,
            ...partial.payments.customGateway,
          },
          stripe: { ...base.payments.stripe, ...partial.payments.stripe },
        }
      : base.payments,
    email: partial.email ? { ...base.email, ...partial.email } : base.email,
    play: partial.play ? { ...base.play, ...partial.play } : base.play,
    pixels: partial.pixels
      ? { ...base.pixels, ...partial.pixels }
      : base.pixels,
  };
}

function coerceSettings(raw: unknown): StoreSettings {
  if (!raw || typeof raw !== "object") return structuredClone(DEFAULTS);
  return mergeSettings(DEFAULTS, raw as Partial<StoreSettings>);
}

async function loadFromDb(): Promise<StoreSettings> {
  const { prisma } = await import("./index");
  const row = await prisma.setting.findUnique({ where: { key: SETTINGS_KEY } });
  if (!row?.value) return structuredClone(DEFAULTS);
  return coerceSettings(row.value);
}

async function saveToDb(next: StoreSettings): Promise<void> {
  const { prisma } = await import("./index");
  await prisma.setting.upsert({
    where: { key: SETTINGS_KEY },
    create: { key: SETTINGS_KEY, value: next as object },
    update: { value: next as object },
  });
}

export async function getSettings(): Promise<StoreSettings> {
  if (useDb()) return loadFromDb();
  return structuredClone(memStore);
}

/** Public-safe: no secret keys */
export async function getPublicSettings() {
  const s = await getSettings();
  return {
    payments: {
      cod: { enabled: s.payments.cod.enabled },
      bank: {
        enabled: s.payments.bank.enabled,
        accountName: s.payments.bank.accountName,
        bankName: s.payments.bank.bankName,
        accountNumber: s.payments.bank.accountNumber
          ? `****${s.payments.bank.accountNumber.slice(-4)}`
          : "",
      },
      jazzcash: { enabled: s.payments.jazzcash.enabled },
      easypaisa: { enabled: s.payments.easypaisa.enabled },
      customGateway: {
        enabled: s.payments.customGateway.enabled,
        providerName: s.payments.customGateway.providerName || "Online payment",
        instructions: s.payments.customGateway.instructions,
      },
      stripe: {
        enabled: s.payments.stripe.enabled,
        publishableKey: s.payments.stripe.publishableKey,
      },
    },
    play: s.play,
    pixels: {
      metaPixelId:
        s.pixels.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
      gaId: s.pixels.gaId || process.env.NEXT_PUBLIC_GA_ID || "",
    },
  };
}

export async function updateSettings(
  partial: Partial<StoreSettings>
): Promise<StoreSettings> {
  if (useDb()) {
    const current = await loadFromDb();
    const next = mergeSettings(current, partial);
    await saveToDb(next);
    return structuredClone(next);
  }
  memStore = mergeSettings(memStore, partial);
  return structuredClone(memStore);
}

/** Full settings for admin (secrets included — never expose on public routes) */
export async function getAdminSettings(): Promise<StoreSettings> {
  return getSettings();
}
