// Written by Simion Cartis
// imports
import { renderPaymentSummary } from '../../scripts/checkout/paymentSummary.js';
import { renderOrderSummary, } from '../../scripts/checkout/orderSummary.js';
import { addToCart, cart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { centsToDollars } from '../../scripts/utils/money.js';
import { loadProducts } from '../../data/products.js';

// global variables
let id1;
let id2;

beforeAll((done) => {
  loadProducts(() => {
    id1 = products[0].id;
    id2 = products[1].id;
    done();
  });
});

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
  renderPaymentSummary();
});

describe('testing renderOrderSummary', () => {
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

describe('testing delivery option features', () => {
  test('correct delivery option is marked on page', () => {
    expect(document.querySelector(`.js-delivery-option-input-${id1}-1`).checked).toBe(true);
  });
  test('delivery option correctly changes', () => {
    document.querySelector(`.js-deliver-option-${id1}-2`).click();

    expect(cart[0].deliveryOptionId).toBe('2');
    expect(document.querySelector(`.js-delivery-option-input-${id1}-1`).checked).toBe(false);
    expect(document.querySelector(`.js-delivery-option-input-${id1}-2`).checked).toBe(true);

  });
});

describe('testing payment information', () => {
  test('values are correct', () => {
    expect(document.querySelector(`.js-payment-summary-money-shipping`).textContent).toContain('$0.00');
    expect(document.querySelector(`.js-payment-summary-money-items`).textContent).toContain('$52.80');
    expect(document.querySelector(`.js-payment-summary-money-before-tax`).textContent).toContain('$52.80');
    expect(document.querySelector(`.js-payment-summary-money-tax`).textContent).toContain('$5.28');
    expect(document.querySelector(`.js-payment-summary-money-total`).textContent).toContain('$58.08');
  });
  test('values are correct after changing delivery date', () => {
    document.querySelector(`.js-deliver-option-${id1}-2`).click();

    expect(document.querySelector(`.js-payment-summary-money-shipping`).textContent).toContain('$4.99');
    expect(document.querySelector(`.js-payment-summary-money-items`).textContent).toContain('$52.80');
    expect(document.querySelector(`.js-payment-summary-money-before-tax`).textContent).toContain('$57.79');
    expect(document.querySelector(`.js-payment-summary-money-tax`).textContent).toContain('$5.78');
    expect(document.querySelector(`.js-payment-summary-money-total`).textContent).toContain('$63.57');

  });
});