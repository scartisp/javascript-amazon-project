//data structure that holds all the products. it is an array of objects
import { centsToDollars } from '../scripts/utils/money.js';

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  /**
   * produces any additional html info a product may need
   * @returns a string containing any additional html info
   */
  extraInfoHTML() {
    return ``;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return `$${centsToDollars(this.priceCents)}`;
  }
}

class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); //this calls the constructor of the parent class
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  /**
   * produces any additional html info a product may need
   * @returns a string containing any additional html info
   */
  extraInfoHTML() {
    return `
    <a href="${this.sizeChartLink}" target="_blank">Size chart</a>
    `;
  }

}

class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  /**
   * produces any additional html info a product may need
   * @returns a string containing any additional html info
   */
  extraInfoHTML() {
    return `
    <a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>
    `;
  }
}

export const products = []

export function loadProducts() {
  const promise = fetch( //you can save in an object, it returns a promise
    'https://supersimplebackend.dev/products')
    .then((response) => {
      return response.json(); //response.json() is a promise after returning a promise, you can add a then() to it. so this chain is pretty much response.json().then()
                              //fetch automatically returns a promise
    }).then((productsData) => {
      products.push(...productsData.map((productDetails) => {
        if (productDetails.type === 'clothing')
          return new Clothing(productDetails);
        else if (productDetails.type === 'appliance')
          return new Appliance(productDetails);
        else
          return new Product(productDetails);
      }));

      console.log('products loaded');
    });
    return promise;
}

// loadProductsFetch().then(() => {
//   console.log('next step');
// });//since the function returns a promise, you can add a then to do something after the promise

// export function loadProducts(fun = () => { }) {
//   const xhr = new XMLHttpRequest();

//   xhr.addEventListener('load', () => {
//     products.push(...JSON.parse(xhr.response).map((productDetails) => {
//       if (productDetails.type === 'clothing')
//         return new Clothing(productDetails);
//       else if (productDetails.type === 'appliance')
//         return new Appliance(productDetails);
//       else
//         return new Product(productDetails);
//     }));

//     console.log('products loaded')
//     fun();
//   });

//   xhr.open('GET', 'https://supersimplebackend.dev/products');
//   xhr.send();
// }

/**
 * finds the cart item's matching product (the product that the cart item is)
 * @param {string} productId the cart item's product id used to find the matching product 
 * @returns the product object that is the same as the desired cart item
 */
export function getProduct(productId) {
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId)
      matchingProduct = product;
  });

  return matchingProduct;
}