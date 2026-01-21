// Written by Simion Cartis
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { addToCart, cart } from '../../data/cart.js';

beforeEach(() => {
  cart.length = 0;
  localStorage.clear();

  document.body.innerHTML = `
    <div class="js-test-container">
      <div class="js-order-summary"></div>
    </div>
  `;
});

describe('test suite: render Order summary', () => {
  test('displays the cart', () => {
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 2);
    // document.querySelector('.js-test-container').innerHTML = `
    // <div class="js-order-summary><div>
    // `;
    const orderSummary = document.querySelector('.js-order-summary');
    renderOrderSummary(orderSummary);

    expect(document.querySelectorAll('.js-cart-item-container').length).toBe(2);
  });
});