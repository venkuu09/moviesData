export const PAGE_SIZE = 50;

export const dollars = n =>
  n == null ? null : `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export const paginate = (page = 1) => {
  const p = Math.max(1, parseInt(page));
  return { limit: PAGE_SIZE, offset: (p - 1) * PAGE_SIZE };
};
