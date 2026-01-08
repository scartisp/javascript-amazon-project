import { cart } from "../../data/cart.js";
import { centsToDollars } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryDate } from "../../data/deliveryOptions.js";

/**
 * dynammically creates the HTML for the payment summary section of the checkout page 
 */
export function renderPaymentSummary() {
  let itemsPrice = 0;
  let shippingTotal = 0;
  let tax = 0;
  let orderTotal = 0;
  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
      itemsPrice += product.priceCents * cartItem.quantity;
    const deliveryDate = getDeliveryDate(cartItem.deliveryOptionId);
    shippingTotal += deliveryDate.priceCents;
  });
  tax = (itemsPrice+shippingTotal)*.1;
  orderTotal = tax + itemsPrice + shippingTotal;
  console.log('item prices ' + centsToDollars(itemsPrice));
  console.log('shipping price ' + centsToDollars(shippingTotal));
  console.log('tax ' + centsToDollars(tax));
  console.log('order total ' + centsToDollars(orderTotal));
}