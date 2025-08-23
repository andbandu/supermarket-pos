export function formatMoney(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "LKR", // replace later with store setting
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
