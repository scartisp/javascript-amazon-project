// Written by: Simion Cartis

import { centsToDollars } from '../scripts/utils/money.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function priceOfOrder (order) {
  return `${centsToDollars(order.totalCostCents)}`;
}