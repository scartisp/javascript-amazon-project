// written by: Simion Cartis 

//Imported things
import { addToCart, addQuantity, cart, removeCartItem, updateDeliveryOption, isInCart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { describe, jest } from '@jest/globals';
import { loadProducts } from '../../data/products.js';

//global variables 
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

describe('testing removeCartItem', () => {
  test('testing removing the first item from the cart', () => {
    addToCart(id1, 1);
    addToCart(id2, 1);
    removeCartItem(id1);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id2);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });
  test('testing removing the second item from the cart', () => {
    addToCart(id1, 1);
    addToCart(id2, 1);
    removeCartItem(id2);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id1);
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual(cart);
  });
  test('testing removing an item that is not in the cart', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { }); //create a mock of console.error
    addToCart(id1, 1);
    removeCartItem(id2);

    expect(cart.length).toBe(1);
    expect(cart[0].productId).toBe(id1);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});

describe('testing updateDeliveryOption', () => {
  test('updating delivery option', () => {
    addToCart(id1, 1);
    updateDeliveryOption(0, 2);

    expect(cart[0].deliveryOptionId).toBe(2);
    expect(JSON.parse(localStorage.getItem('cart'))[0].deliveryOptionId).toEqual(2);
  });
  test('updating delivery option for item not in the cart', () => {
    addToCart(id1, 1);

    expect(updateDeliveryOption(-1, 2)).toBe(-1);
    expect(updateDeliveryOption(1, 2)).toBe(-1);
  });
});