// Written by Simion Cartis
// imports
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { addToCart, cart } from '../../data/cart.js';

// global variables
const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const id2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

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