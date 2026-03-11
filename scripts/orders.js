// Written by: Simion Cartis
import { orders, priceOfOrder } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import { loadProducts } from '../data/products.js';
const ordersGrid = document.querySelector('.js-orders-grid');


await loadProducts();
renderOrders();
//TODO: make order place date correct as well as arrival date
//TODO: adding empty cart to order crashes order page, fix
/**
 * renders the order page information
 */
export function renderOrders() {
  ordersGrid.innerHTML = '';
  let ordersGridHTML = ``;
  console.log(orders.length)
  console.log(orders);
  orders.forEach(order => {
    const items = order.products;
    ordersGridHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.orderTime}</div>
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
            ${generatorOrderDetails(items)}
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
function generatorOrderDetails(items) {
  let HTML = '';
  items.forEach(item => {
    const matchingProduct = getProduct(item.productId)
    HTML +=
      `<div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
  });
  return HTML;
}