import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

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

/**
 * function to calulate a delivery date based on the current date and given number of days until delivery
 * @param {number} daysUntilDelivery the amount of days until delivery. Intended to be derived from deliveryOptions.deliveryDays
 * @param {object} currDay a day object that is used as the starting point to calculate delivery date. Defaults to the current day
 * @returns {object} returns the delivery date
 */
export function calculateDeliveryDate(daysUntilDelivery, currDay = dayjs()) {
  while (daysUntilDelivery > 0) {
    currDay = currDay.add(1, 'day');
    if (!isWeekend(currDay))
      --daysUntilDelivery;
  }
  return currDay;
}
/**
 * helper function to check if a given day is a weekend
 * @param {object} givenDay the day checked to see if it is a weekend or not 
 * @returns {boolean} returns true if the given date is a weekend, false if not
 */
function isWeekend(givenDay) {
  return (givenDay.day() === 6 || givenDay.day() === 0);
}