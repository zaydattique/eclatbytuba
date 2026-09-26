// Email templates will live here (Resend / React Email)
export function orderConfirmationEmail(orderNumber: string) {
  return {
    subject: `Order Confirmed — ${orderNumber}`,
    html: `<p>Thank you for your order ${orderNumber}.</p>`,
  };
}
