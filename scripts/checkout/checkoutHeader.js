//written by: Simion Cartis

import { numInCart } from "../../data/cart.js";

//DOM THINGS
const checkoutHeader = document.querySelector('.js-checkout-header');


/**
 * function that updates the checkout header whenever the quantity of items in the cart changes
 */
export function renderCheckoutHeader() {
  const returnToHomeLink = numInCart() === 1 ? numInCart() + ' item' : numInCart() + ' items';
  const checkoutHeaderHTML = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link" href="amazon.html"> ${returnToHomeLink}</a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
  `;
  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}