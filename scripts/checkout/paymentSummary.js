import { cart } from "../../data/cart.js";
import { centsToDollars } from "../utils/money.js";
import { getItemInCart } from "./orderSummary.js";

export function renderPaymentSummary() {
  let itemsPrice = 0;
  cart.forEach(cartItem => {
    let matchingProduct = getItemInCart(cartItem.productId);
    for (let i = 0; i < cartItem.quantity; ++i)
      itemsPrice += matchingProduct.priceCents;
  });

  console.log(centsToDollars(itemsPrice));
}