//written by: Simion Cartis
//export keyword allows this variable to be accessed outside of the cart.js file
export const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2 
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}]; //when putting thing in cart, simply adding the productId and the quantity.
// then, the product name is searched for from the array in product.js
// this technique is called normalizing the data

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