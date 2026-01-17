//Written by: Simion Cartis
import { centsToDollars } from '../scripts/utils/money.js';
//const centsToDollars = require('../scripts/utils/money.js');

describe('testing centsToDollars', () => {
  test.each([
    [2095, '20.95'],
    [0, '0.00'],
    [1, '0.01'],
    [1.5, '0.02'],
    [999999, '9999.99']
  ])('formats %p cents as %s', (input, expected) => {
    expect(centsToDollars(input)).toBe(expected);
  });
}); //jest translates %p as the first argument (intput) and %s as second argument (output)