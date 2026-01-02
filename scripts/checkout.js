// written by: Simion Cartis

// IMPORTED THINGS
import { cart, removeCartItem, numInCart, isInCart, changeAmount } from '../data/cart.js';
import { products } from '../data/products.js';
import { centsToDollars } from './utils/money.js';

// DOM THINGS
const orderSummary = document.querySelector('.js-order-summary');
const returnToHomeLink = document.querySelector('.js-return-to-home-link');
displayHTML();

/**
 * function that is first called to dynamically make the html and functionalities
 */
function displayHTML() {
  updateReturnToHomeLink();
  createCartHTML();
  orderSummary.innerHTML = createCartHTML();
  deleteButton();
  updateLink();
  saveLink();
  addButtonKeyListeners();
}

/**
 * helper function that creates the html for the cart
 * @returns returns a string containing the cart's html
 */
function createCartHTML() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === productId)
        matchingProduct = product;
    });
    cartSummaryHTML +=
      `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${centsToDollars(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label${productId}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${productId}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${productId}"> </input>
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${productId}"> Save </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }); // the delivery date selector is of type "radio" basically, what that does is, if different selectors have the same
  // "name" attribute, only one can be slected at a time
  return cartSummaryHTML;
}

/**
 * helper function that creates the event listener for the delete button on a cart item
 */
function deleteButton() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeCartItem(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateReturnToHomeLink();
    });
  });
}

/**
 * pressing the upade link hides the link and allows you to change the desired item's quantity in cart
 */
function updateLink() {
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });
}

/**
 * pressing the save link will change whatever 
 */
function saveLink() {
  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      saveFunctionality(productId);
    });
  });

}
/**
 * 
 * @param {string} productId the desired product's ID 
 * @returns returns null if the new quantity is less than zero or greater than 1,000 or if the new quantity is left empty
 */
function saveFunctionality(productId) {
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
  const indexInCart = isInCart(productId);
  const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  console.log(document.querySelector(`.js-quantity-input-${productId}`).value);
  if (document.querySelector(`.js-quantity-input-${productId}`).value === '') {
    console.error('no amount specified');
    return;
  }
  else if (newQuantity < 0 || newQuantity > 1000) {
    console.error('invalid amount');
    return;
  } else if (newQuantity === 0) {
    removeCartItem(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  } else {
    //cart[indexInCart].quantity = newQuantity;
    changeAmount(indexInCart, newQuantity);
    document.querySelector(`.js-quantity-label${productId}`).innerHTML = newQuantity;
  }
  updateReturnToHomeLink();
}
/**
 * adds key listeners to the document
 * Enter: pressing enter will change the amount of any item in the cart whose quantity is currently being edited
 */
function addButtonKeyListeners() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
        const productId = link.dataset.productId;
        if (document.querySelector(`.js-cart-item-container-${productId}`).classList.contains('is-editing-quantity')) {
          saveFunctionality(productId);
        }
      });
    }
  });
}

/**
 * function that updates the number found at the top of the checkout page
 */
function updateReturnToHomeLink() {
  returnToHomeLink.innerHTML = numInCart() === 1 ? numInCart() + ' item' : numInCart() + ' items';
}