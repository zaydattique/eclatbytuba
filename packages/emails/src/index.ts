/**
 * Email helpers — Resend when RESEND_API_KEY is set; otherwise console mock.
 */

export function orderConfirmationEmail(orderNumber: string) {
  return {
    subject: `Order Confirmed — ${orderNumber}`,
    html: `<p>Thank you for your order <strong>${orderNumber}</strong>.</p>`,
  };
}

export async function sendOrderConfirmation(opts: {
  to: string;
  orderNumber: string;
  total: number;
  paymentMethod: string;
}) {
  const subject = `Éclat by Tuba — Order ${opts.orderNumber}`;
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;color:#2D2A2B">
      <h1 style="color:#C45C7A;font-size:20px">Thank you for your order</h1>
      <p>Order <strong>${opts.orderNumber}</strong> has been received.</p>
      <p>Total: <strong>PKR ${opts.total.toLocaleString()}</strong></p>
      <p>Payment: ${opts.paymentMethod.replace(/_/g, " ")}</p>
      <p style="color:#6B5E62;font-size:14px">We'll update you when it ships. Soft gloss, self-care — Éclat by Tuba.</p>
    </div>
  `;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[email:mock] order confirmation", {
      to: opts.to,
      orderNumber: opts.orderNumber,
      subject,
    });
    return { mocked: true };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Éclat by Tuba <orders@eclatbytuba.com>",
      to: opts.to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend failed: ${text}`);
  }
  return { mocked: false };
}
