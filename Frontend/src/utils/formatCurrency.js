export default function formatCurrency(amount, currency = 'NGN') {
  const nairaFormatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
  });
  return nairaFormatter.format(amount);
}
