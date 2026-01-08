/**
 * changes the cents value of a given item to it's dollar equivalent
 * @param {number} priceInCents an item's value in cents ($1 = 100 cents) 
 * @returns {number} the same value but as a dollar representation (rounded to two decimal places)
 */
export function centsToDollars (priceInCents) {
  return (priceInCents/100).toFixed(2);
}

// export default centsToDollars;
// this is how you do default exports