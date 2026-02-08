//written by: Simion Cartis

//by convention, classes start with a capital letter
class Cart {
  //private properties are defined by a hash in front, public ones don't have it
  #localStorageKey;
  cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];

  //to create a constructor, literally just use keyword "constructor" for the function
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
  }

  /**
   * saves the cart's content to localStorage
   */
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  /**
   * function that removes an item in the cart by its id
   * @param {string} productId the items id 
   * @returns the index of the item in the cart array
  */
  removeCartItem(productId) {
    const indexToRemove = isInCart(productId);
    if (indexToRemove < 0) {
      console.error('item is not in cart');
      return;
    }
    this.cartItems.splice(indexToRemove, 1);
    saveToStorage();
  }

  /**
   * helper function to check if an item already exists in the cart.
   * @param {string} productId takes in a parameter of type string to identify the product by its ID 
   * @returns if item exists, return its index, if not return -1
   */
  isInCart(productId) {
    for (let i = 0; i < cart.length; ++i) {
      if (this.cartItems[i].productId === productId)
        return i;
    }
    return -1;
  }

  /**
   * function that finds the total amount of items in the cart (including duplicate items)
   * @returns returns the number of items in the cart (including duplicates)
   */
  numInCart() {
    let quantity = 0;
    this.cartItems.forEach(item => quantity += item.quantity);
    return quantity;
  }

  /**
   * function to add a new product to the cart. deliveryOptionId defaults to '1' (free shipping, seven day delivery)
   * @param {number} productId the id of the product that is beign added 
   * @param {number} quantity the amount that is being added
   */
  addToCart(productId, quantity) {
    this.cartItems.push({ // if not, add to cart
      productId: productId, //dataset gets the data-attributes, productId is the specific
      quantity: quantity, // atrubute (it automatically switches to cammel case)
      deliveryOptionId: '1'
    });
    saveToStorage();
  }

  /**
   * changes the amount of a specified item that is in the cart
   * @param {number} index the item's specified index
   * @param {number} newAmount the new amount to change to
   */
  changeAmount(index, newAmount) {
    this.cartItems[index].quantity = newAmount;
    saveToStorage();
  }

  /**
   * function to add more of a pre-existing product to the cart
   * @param {number} index index of the item in the cart to add more of 
   * @param {number} newAmount amount to add 
   */
  addQuantity(index, newAmount) {
    this.cartItems[index].quantity += newAmount;
    saveToStorage();
  }

  /**
   * function to change a cart item's delivery date
   * @param {number} index index of the cart item whose delivery date you wish to change 
   * @param {string} deliverOptionId  id for the new delivery option
   */
  updateDeliveryOption(index, deliverOptionId) {
    if (index < 0 || index >= this.cartItems.length)
      return;
    this.cartItems[index].deliveryOptionId = deliverOptionId;
    saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);
//how to check if something is an instance of a class
console.log(businessCart instanceof Cart);
