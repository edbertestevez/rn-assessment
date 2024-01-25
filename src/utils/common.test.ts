import { getPercentageValue } from '.';

it('returns correct percentage value with 2 decimal places', () => {
  expect(
    getPercentageValue({
      percentage: 10,
      value: 100,
    }),
  ).toEqual(10);

  expect(
    getPercentageValue({
      percentage: 22,
      value: 99,
    }),
  ).toEqual(21.78);
});
