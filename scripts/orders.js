// Written by: Simion Cartis
import { orders, priceOfOrder, findArrivalDate } from '../data/orders.js';
import { getProduct, loadProducts } from '../data/products.js';
import { isInCart, addToCart, addQuantity, numInCart } from '../data/cart.js';
import { search } from './searchBar.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const ordersGrid = document.querySelector('.js-orders-grid');
const cartQuantity = document.querySelector('.js-cart-quantity');
const searchBar = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');
await loadProducts();
search(searchBar, searchButton);
renderOrders();

/**
 * renders the order page information
 */
export function renderOrders() {
  cartQuantity.innerHTML = numInCart();

  ordersGrid.innerHTML = '';
  let ordersGridHTML = ``;
  orders.forEach(order => {
    // console.log(order);
    const items = order.products;
    ordersGridHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${priceOfOrder(order)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid">
            ${generatorOrderDetails(items, order)}
        </div>
      </div>`;
  });
  ordersGrid.innerHTML = ordersGridHTML;
}
/**
 * renders the information for each order
 * @param {Array} items the order whose information is being generated 
 * @returns returns html that holds the rendered info
 */
function generatorOrderDetails(items, order) {
  let HTML = '';
  items.forEach(item => {
    const matchingProduct = getProduct(item.productId)
    const orderDate = dayjs(order.orderTime)
    const deliveryDate = dayjs(item.estimatedDeliveryTime)
    console.log(item);
    const arrivalDate = findArrivalDate(deliveryDate, orderDate)
    HTML +=
      `<div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(arrivalDate).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${item.productId}">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&itemId=${item.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
  });
  return HTML;
}

// /**
//  * helper function to calculate correct expected delivery date. The back end does not skip weekends, so I needed to add this function
//  * @param {object} deliveryDate the incorrect expected delivery date gotten from the backend 
//  * @param {object} orderDate the date the item was ordered
//  * @returns returns the expected delivery date which accounts for weekends.
//  */
// function findArrivalDate(deliveryDate, orderDate) {
//   const TimeUntilDelivery = deliveryDate.diff(orderDate, 'd');
//   return calculateDeliveryDate(TimeUntilDelivery, orderDate);
// }

document.querySelectorAll('.js-buy-again-button').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const index = isInCart(productId);
    if (index >= 0)
      addQuantity(index, 1);
    else
      addToCart(productId, 1);
  })
})