import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, products } from "../data/products.js";

await loadProducts() //await is the same thing as using then(), it waits for the promise to be fulfilled
renderOrderSummary();
renderPaymentSummary();
renderCheckoutHeader();


/*you can run multiple promises simultaneously with promise.all() 
ex:
Promise.all([
  new Promise((resolve) => {
    resolve('something');
  }),
  new Promise((resolve) => {
    resolve('something else');
  })
]).then((values)=> { //values here is an array of what was passed into the resolves
    something to do after
})
*/