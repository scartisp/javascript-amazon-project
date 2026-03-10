import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";


new Promise((resolve) => {// promises are better than callbacks because multiple callbacks create a lot of nesting
  console.log('start promise');
  loadProducts(() => {
    resolve(); //reslove finishes the function Promise takes and then runs 'then'
  });// resolve can take an argument. The argument will be passed as the first paramter for 'then'

}).then(() => { // after products are loaded, render the page.
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});// 'thens' can have Promises in them as well



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