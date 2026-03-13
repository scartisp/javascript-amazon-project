//Written by: Simion Cartis

import { loadProducts, getProduct } from "../data/products.js";
import { getOrder, getItemInOrder, findArrivalDate } from "../data/orders.js";
import { numInCart } from "../data/cart.js";
import { search } from "./searchBar.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const orderTracking = document.querySelector('.js-order-tracking');
const cartQuantity = document.querySelector('.js-cart-quantity');
const searchBar = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');

await loadProducts();
search(searchBar, searchButton);
renderTracking();

/**
 * dyncamically generate the html for the tracking page
 */
function renderTracking() {
  cartQuantity.innerHTML = numInCart();
  const url = new URL(window.location.href)

  const itemId = url.searchParams.get('itemId');
  const orderId = url.searchParams.get('orderId');
  const matchingProduct = getProduct(itemId);
  const matchingOrder = getOrder(orderId);
  const matchingItem = getItemInOrder(matchingOrder, itemId);

  const deliveryDate = dayjs(matchingItem.estimatedDeliveryTime);
  const orderDate = dayjs(matchingOrder.orderTime)
  const arrivalDate = findArrivalDate(deliveryDate, orderDate);
  const timeUntilArrival = (dayjs().diff(orderDate, 'd')/arrivalDate.diff(orderDate, 'd'))*100

  const orderTrackingHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${arrivalDate.format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingItem.quantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label ${(timeUntilArrival >= 0 && timeUntilArrival <= 49) ? 'current-status': ''}">
          Preparing
        </div>
        <div class="progress-label ${(timeUntilArrival >= 50 && timeUntilArrival <= 99) ? 'current-status': ''}">
          Shipped
        </div>
        <div class="progress-label ${(timeUntilArrival >= 100) ? 'current-status': ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${timeUntilArrival}%": ></div>
      </div>`;
  orderTracking.innerHTML = orderTrackingHTML;
}