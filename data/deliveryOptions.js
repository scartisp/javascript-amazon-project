export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]

/**
 * retrieves a cart item's delivery date
 * @param {string} cartItemDeliveryId the cart item's delivery option id 
 * @returns {object} returns the delivery date object that matches with the cart item's delivery date
 */
export function getDeliveryDate(cartItemDeliveryId) {
  let deliveryDate;
  deliveryOptions.forEach(deliveryOption => {
    if (deliveryOption.id === cartItemDeliveryId)
      deliveryDate = deliveryOption;
  });
  return deliveryDate || deliveryOptions[0];
}