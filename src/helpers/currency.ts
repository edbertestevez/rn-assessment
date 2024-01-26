/**
 * Formats the numbers with USD currency
 * @param { number } value
 * @returns { string }
 * @example
 * // returns $2.00
 * formatCurrency(2);
 */
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
