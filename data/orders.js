// Written by: Simion Cartis

class Order {
  date;
  costInCents;
  id;
  items;

  constructor(orderDetails) {
    this.date = orderDetails.date;
    this.costInCents = orderDetails.costInCents;
    this.id = orderDetails.id;
    this.items = orderDetails.items;
  }

  getDate() {
    return this.date;
  }
}

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(orderDetails) {
  const order = new Order(orderDetails);
  orders.unshift(order);
  saveToStorage();
  console.log(typeof order);
  console.log(order.date);
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}