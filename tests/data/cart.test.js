// written by: Simion Cartis 
import { addToCart, addQuantity, cart } from '../../data/cart.js';

const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

beforeEach(() => {
  cart.length = 0;
  localStorage.clear();
});

describe('testing addToCart', () => {
  test('adds a new product to the cart', () => {
    addToCart(id1, 1);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id1);
    expect(cart[0].quantity).toBe(1);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });

  test('adds two instance of a new product to the cart', () => {
    addToCart(id1, 2);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id1);
    expect(cart[0].quantity).toBe(2);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });
});

describe('testing addQuantity', () => {
  test('adds an existing product to the cart', () => {
    addToCart(id1, 1);
    addQuantity(0, 1);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id1);
    expect(cart[0].quantity).toBe(2);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });

});