// written by: Simion Cartis

// IMPORTED THINGS
import { renderPaymentSummary } from './paymentSummary.js';
import { cart, removeCartItem, isInCart, changeAmount, updateDeliveryOption } from '../../data/cart.js';
import { deliveryOptions, calculateDeliveryDate} from '../../data/deliveryOptions.js'; //this is called a named export, used when files export multipe things
import { centsToDollars } from '../utils/money.js';
import { getProduct } from '../../data/products.js';
import { renderCheckoutHeader } from './checkoutHeader.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // without the {} it is called the default export, used when wanting to export a single thing
// DOM THINGS
const orderSummary = document.querySelector('.js-order-summary');
/**
 * function that is first called to dynamically make the html and functionalities
 */
export function renderOrderSummary() {
  orderSummary.innerHTML = createCartHTML();
  deleteButton();
  updateLink();
  saveLink();
  changeDeliveryDate();
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
    const matchingProduct = getProduct(productId);

    const deliveryDate = getDeliveryDate(cartItem);

    cartSummaryHTML +=
      `
    <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date js-delivery-date${productId}">
        Delivery date: ${deliveryDate.format('dddd, MMMM D')}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
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
          ${deliverOptionsHTML(cartItem)}
        </div>
      </div>
    </div>
  `;
  }); // the delivery date selector is of type "radio" basically, what that does is, if different selectors have the same
  // "name" attribute, only one can be slected at a time
  return cartSummaryHTML;
}

/**
 * generates the delivery option html for a given cart itme
 * @param {object} cartItem the cart item that the delivery options are being generated for  
 * @returns returns a string that is the html for the delivery options
 */
function deliverOptionsHTML(cartItem) {
  let HTML = '';
 deliveryOptions.forEach((deliveryOption) => {
    const deliveryDate = calculateDeliveryDate(deliveryOption);
    const priceString = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${centsToDollars(deliveryOption.priceCents)} - Shipping`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    HTML += `<div class="delivery-option js-delivery-option" data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${cartItem.productId}">
            <div>
              <div class="delivery-option-date">
                ${deliveryDate.format('dddd, MMMM D')}
              </div>
              <div class="delivery-option-price">
                ${priceString}
              </div>
            </div>
          </div>`;
  })
  return HTML;
}

/**
 * function to change the delivery date of a specified item from a click
 */
function changeDeliveryDate() {
  document.querySelectorAll('.js-delivery-option').forEach(element => element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    const indexInCart = isInCart(productId);
    updateDeliveryOption(indexInCart, deliveryOptionId);
    renderOrderSummary();
    renderPaymentSummary();
  }));
}

/**
 * helper function that finds the delivery date for a given item in the cart
 * @param {object} cartItem the cart item that you are trying to get the delivery date for 
 * @returns returns the delivery date (determined by delivery option selected by user)
 */
function getDeliveryDate(cartItem) {
  const deliverOptionId = cartItem.deliveryOptionId;
  let matchingDelivery;
  deliveryOptions.forEach((deliverOption) => {
    if (deliverOption.id === deliverOptionId)
      matchingDelivery = deliverOption;
  })
  return dayjs().add(matchingDelivery.deliveryDays, 'days');
}

/**
 * helper function that creates the event listener for the delete button on a cart item
 */
function deleteButton() {
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeCartItem(productId);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
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
  if (document.querySelector(`.js-quantity-input-${productId}`).value === '') {
    console.error('no amount specified');
    return;
  }
  else if (newQuantity < 0 || newQuantity > 1000) {
    console.error('invalid amount');
    return;
  } else if (newQuantity === 0) {
    removeCartItem(productId);
    renderOrderSummary();
  } else {
    changeAmount(indexInCart, newQuantity);
    document.querySelector(`.js-quantity-label${productId}`).innerHTML = newQuantity;
  }
  renderPaymentSummary();
  renderCheckoutHeader();
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