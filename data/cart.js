//written by: Simion Cartis
//export keyword allwos this variable to be accessed outside of the cart.js file
export const cart = [];

/**
 * helper function to check if an item already exists in the cart.
 * @param {string} productId takes in a parameter of type string to identify the product by its ID 
 * @returns if item exists, return its index, if not return -1
 */
export function isInCart(productId) {
  for (let i = 0; i < cart.length; ++i) {
    if (cart[i].productId === productId)
      return i;
  }
  return -1;
}
