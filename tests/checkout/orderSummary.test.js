// Written by Simion Cartis
// imports
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { addToCart, cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { centsToDollars } from '../../scripts/utils/money.js';

// global variables
const id1 = products[0].id;
const id2 = products[1].id;

beforeEach(() => {
  cart.length = 0;
  localStorage.clear();

  document.body.innerHTML = `
    <div class="js-test-container">
      <div class ="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    </div>
  `;
  addToCart(id1, 1);
  addToCart(id2, 2);
  renderOrderSummary();
});

describe('test suite: render Order summary', () => {
  test('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toBe(2);
    expect(document.querySelector(`.js-product-quantity-${id1}`).textContent).toContain('Quantity: 1');
    expect(document.querySelector(`.js-product-quantity-${id2}`).textContent).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-name-${id1}`).textContent).toContain(products[0].name);
    expect(document.querySelector(`.js-product-name-${id2}`).textContent).toContain(products[1].name);
    expect(document.querySelector(`.js-product-price${id1}`).textContent).toContain(`$${centsToDollars(products[0].priceCents)}`);
    expect(document.querySelector(`.js-product-price${id2}`).textContent).toContain(`$${centsToDollars(products[1].priceCents)}`);
  });
  test('removes a product', () => {
    document.querySelector(`.js-delete-link-${id1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toBe(1);
    expect(document.querySelector(`.js-cart-item-container-${id1}`)).toBeNull();
    expect(document.querySelector(`.js-cart-item-container-${id2}`)).not.toBeNull();
    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id2);
  });
});