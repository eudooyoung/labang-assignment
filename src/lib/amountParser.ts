export const amountParser = (amount: number) => {
  if (amount < 10000) {
    return amount.toLocaleString();
  }

  if (amount >= 10000 && amount < 100_000) {
    const parsed = Number((amount / 10_000).toFixed(2));
    return `${parsed.toLocaleString()}만`;
  }

  if (amount >= 100_000 && amount < 1_000_000) {
    const parsed = Number((amount / 10_000).toFixed(1));
    return `${parsed.toLocaleString()}만`;
  }

  if (amount >= 1_000_000 && amount < 100_000_000) {
    const parsed = Number((amount / 10_000).toFixed(0));
    return `${parsed.toLocaleString()}만`;
  }

  if (amount >= 100_000_000) {
    const parsed = Number((amount / 100_000_000).toFixed(2));
    return `${parsed.toLocaleString()}억`;
  }
};
