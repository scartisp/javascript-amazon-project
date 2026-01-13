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
 * function to calulate a delivery date based on the current date and given a delivery option
 * @param {object} deliveryOption the delivery option that is used to calculate the delivery date 
 * @returns {object} returns the delivery date
 */
export function calculateDeliveryDate(deliveryOption) {
  let currDay = dayjs();
  let daysLeft = deliveryOption.deliveryDays;
  while (daysLeft > 0) {
    currDay = currDay.add(1, 'day');
    if (!isWeekend(currDay))
      --daysLeft;
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