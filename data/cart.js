//written by: Simion Cartis
//export keyword allows this variable to be accessed outside of the cart.js file
export const cart = JSON.parse(localStorage.getItem('cart')) ||
  []; //when putting thing in cart, simply adding the productId and the quantity.
// then, the product name is searched for from the array in product.js
// this technique is called normalizing the data

/**
 * saves the cart's content to localStorage
 */
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * function that removes an item in the cart by its id
 * @param {string} productId the items id 
 * @returns the index of the item in the cart array
*/
export function removeCartItem(productId) {
  const indexToRemove = isInCart(productId);
  if (indexToRemove < 0) {
    console.error('item is not in cart');
    return;
  }
  cart.splice(indexToRemove, 1);
  saveToStorage();
}

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

/**
 * function that finds the total amount of items in the cart (including duplicate items)
 * @returns returns the number of items in the cart (including duplicates)
 */
export function numInCart() {
  let quantity = 0;
  cart.forEach(item => quantity += item.quantity);
  return quantity;
}

/**
 * changes the amount of a specified item that is in the cart
 * @param {number} index the item's specified index
 * @param {number} newAmount the new amount to change to
 */
export function changeAmount(index, newAmount) {
  cart[index].quantity = newAmount;
  saveToStorage();
}
