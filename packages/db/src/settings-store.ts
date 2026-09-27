/**
 * Store settings — payments + email + play element
 * In-memory with same pattern as analytics-store; Prisma Setting model when DATABASE_URL is live.
 * Secrets (API keys) never returned to public GET.
 */

export type PaymentMethodId = "cod" | "bank" | "stripe" | "jazzcash" | "easypaisa";

export type StoreSettings = {
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
  play: {
    enabled: boolean;
    tipText: string;
  };
  pixels: {
    metaPixelId: string;
    gaId: string;
  };
};

const DEFAULTS: StoreSettings = {
  payments: {
    cod: { enabled: true },
    bank: {
      enabled: false,
      accountName: "",
      accountNumber: "",
      bankName: "",
    },
    stripe: { enabled: false, publishableKey: "", secretKey: "" },
    jazzcash: { enabled: false, merchantId: "", password: "" },
    easypaisa: { enabled: false, storeId: "", accountNumber: "" },
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

let store: StoreSettings = structuredClone(DEFAULTS);

export function getSettings(): StoreSettings {
  return structuredClone(store);
}

/** Public-safe: no secret keys */
export function getPublicSettings() {
  const s = getSettings();
  return {
    payments: {
      cod: { enabled: s.payments.cod.enabled },
      bank: {
        enabled: s.payments.bank.enabled,
        accountName: s.payments.bank.accountName,
        bankName: s.payments.bank.bankName,
        // account number partially masked for display at checkout if needed
        accountNumber: s.payments.bank.accountNumber
          ? `****${s.payments.bank.accountNumber.slice(-4)}`
          : "",
      },
      stripe: {
        enabled: s.payments.stripe.enabled,
        publishableKey: s.payments.stripe.publishableKey,
      },
      jazzcash: { enabled: s.payments.jazzcash.enabled },
      easypaisa: { enabled: s.payments.easypaisa.enabled },
    },
    play: s.play,
    pixels: {
      metaPixelId: s.pixels.metaPixelId || process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
      gaId: s.pixels.gaId || process.env.NEXT_PUBLIC_GA_ID || "",
    },
  };
}

export function updateSettings(partial: Partial<StoreSettings>): StoreSettings {
  store = {
    ...store,
    ...partial,
    payments: partial.payments
      ? {
          cod: { ...store.payments.cod, ...partial.payments.cod },
          bank: { ...store.payments.bank, ...partial.payments.bank },
          stripe: { ...store.payments.stripe, ...partial.payments.stripe },
          jazzcash: { ...store.payments.jazzcash, ...partial.payments.jazzcash },
          easypaisa: { ...store.payments.easypaisa, ...partial.payments.easypaisa },
        }
      : store.payments,
    email: partial.email ? { ...store.email, ...partial.email } : store.email,
    play: partial.play ? { ...store.play, ...partial.play } : store.play,
    pixels: partial.pixels ? { ...store.pixels, ...partial.pixels } : store.pixels,
  };
  return getSettings();
}

/** Full settings for admin (secrets included — never expose on public routes) */
export function getAdminSettings(): StoreSettings {
  return getSettings();
}
