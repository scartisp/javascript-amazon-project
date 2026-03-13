// Written by: Simion Cartis

import { centsToDollars } from '../scripts/utils/money.js';
import { calculateDeliveryDate } from './deliveryOptions.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

/**
 * function for adding an order to the array of orders
 * @param {object} order the order to be added 
 */
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

/**
 * function to save the array of orders to localStorage
 */
function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

/**
 * function that returns the price of an order in dollars
 * @param {object} order the order whose price is being calculated
 * @returns {string} the cost of an order in dollars
 */
export function priceOfOrder(order) {
  return `${centsToDollars(order.totalCostCents)}`;
}


export function getOrder(orderId) {
  for (let i = 0; i < orders.length; ++i) {
    if (orders[i].id === orderId)
      return orders[i];
  }
}

export function getItemInOrder(order, itemId) {
  for (let i = 0; i < order.products.length; ++i) {
    if (order.products[i].productId === itemId)
      return order.products[i];
  }
}

/**
 * helper function to calculate correct expected delivery date. The back end does not skip weekends, so I needed to add this function
 * @param {object} deliveryDate the incorrect expected delivery date gotten from the backend 
 * @param {object} orderDate the date the item was ordered
 * @returns returns the expected delivery date which accounts for weekends.
 */
export function findArrivalDate(deliveryDate, orderDate) {
  const TimeUntilDelivery = deliveryDate.diff(orderDate, 'd');
  return calculateDeliveryDate(TimeUntilDelivery, orderDate);
}