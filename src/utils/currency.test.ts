import { formatCurrency } from '.';

it('returns correct dollar value', () => {
  expect(formatCurrency(22)).toEqual('$22.00');
  expect(formatCurrency(33.5)).toEqual('$33.50');
});
