//Written by: Simion Cartis
import { centsToDollars } from '../../scripts/utils/money.js';

describe('testing centsToDollars', () => {
  test.each([
    [2095, '20.95'],
    [0, '0.00'],
    [2000.5, '20.01'],
    [2000.4, '20.00'],
    [999999, '9999.99'],
    [-2095, '-20.95']
  ])('formats %p cents as %s', (input, expected) => {
    expect(centsToDollars(input)).toBe(expected);
  });
}); //jest translates %p as the first argument (intput) and %s as second argument (output)

