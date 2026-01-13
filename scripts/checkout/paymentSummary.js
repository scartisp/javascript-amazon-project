// written by: Simion Cartis
import { cart, numInCart } from "../../data/cart.js";
import { centsToDollars } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryDate } from "../../data/deliveryOptions.js";

// DOM THINGS
const paymentSummaryDiv = document.querySelector('.js-payment-summary');
/**
 * dynammically creates the HTML for the payment summary section of the checkout page 
 */
export function renderPaymentSummary() {
  let itemsPriceCents = 0;
  let shippingTotalCents = 0;
  let taxCents = 0;
  let orderTotalCents = 0;
  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
      itemsPriceCents += product.priceCents * cartItem.quantity;
    const deliveryDate = getDeliveryDate(cartItem.deliveryOptionId);
    shippingTotalCents += deliveryDate.priceCents;
  });
  taxCents = (itemsPriceCents+shippingTotalCents)*.1;
  orderTotalCents = taxCents + itemsPriceCents + shippingTotalCents;

  const paymentSummaryHTML = `<div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${numInCart()}):</div>
            <div class="payment-summary-money">$${centsToDollars(itemsPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centsToDollars(shippingTotalCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centsToDollars(itemsPriceCents+shippingTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centsToDollars(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centsToDollars(orderTotalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
  paymentSummaryDiv.innerHTML = paymentSummaryHTML;

}