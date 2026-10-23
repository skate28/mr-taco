/** Dollars as printed on a menu. Amounts under $1 use a cents mark, e.g. 75¢. */
export function formatUsd(amount: number): string {
  if (!Number.isFinite(amount)) return "";
  const cents = Math.round(amount * 100);
  if (cents < 0) return "";
  if (cents === 0) return "$0";
  if (cents < 100) return `${cents}¢`;
  const whole = cents % 100 === 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Starting prices keep a plus, e.g. "$3.50+". */
export function formatPrice(amount: number, priceFrom = false): string {
  const formatted = formatUsd(amount);
  if (!formatted) return "";
  return priceFrom ? `${formatted}+` : formatted;
}

/** Schema.org Offer price, always two decimals. Null when the amount is not a real price. */
export function offerPrice(amount: number): string | null {
  if (!Number.isFinite(amount) || amount < 0) return null;
  return (Math.round(amount * 100) / 100).toFixed(2);
}
