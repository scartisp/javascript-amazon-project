// written by: Simion Cartis

//IMPORTED THINGS
// import by using keyword import {thing to imnport} keyword from, and then path
import { numInCart, isInCart, addQuantity, addToCart } from '../data/cart.js'; // can rename imported things using 'as' keyword.
// Example: import {cart as myCart} ...
import { products, loadProducts } from '../data/products.js';
import { search } from './searchBar.js';
//DOM THINGS
// div that holds all of the products on the main page
const allProducts = document.querySelector('.js-products-gird');
// div that holds the number displayed for the total in cart
const cartQuantity = document.querySelector('.js-cart-quantity');
const searchBar = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');

await loadProducts();
search(searchBar, searchButton);
renderProductsHTML();

// generates the HTML for this page
function renderProductsHTML() {
  cartQuantity.innerHTML = numInCart();
  let productsHTML = '';

  const url = new URL(window.location.href)
  let productsToDisplay = [];
  if (url.searchParams.size === 0) {
    productsToDisplay = products;
  } else {
    findProductsToDisplay(productsToDisplay, url.searchParams.get('search'));
  }

  productsToDisplay.forEach((product) => {
    productsHTML += `
   <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
         data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
  `;
  }); // data-product-name is called a data attribute. Use the word data- and anything you want
  allProducts.innerHTML = productsHTML;

  // adds functionality for the "add product" button that each product has
  document.querySelectorAll('.js-add-to-cart').forEach(button => button.addEventListener
    ('click', () => {
      const productId = button.dataset.productId;
      const indexInCart = isInCart(productId);
      const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      if (indexInCart >= 0) // if item already in cart, increase quantity
        addQuantity(indexInCart, quantity);
      else
        addToCart(productId, quantity);
      showAndHideAdded(productId);
      cartQuantity.innerHTML = numInCart();
    }));
}

/**
 * function for filling productsToDisplay array if there is a search param
 * @param {Array} productsToDisplay the array that will be used to contain all products that will be displayed
 * @param {string} searchParam the string used to filter the products
 */
function findProductsToDisplay(productsToDisplay, searchParam) {
  products.forEach(product => {
    if (product.name.toLowerCase().includes(searchParam))
      productsToDisplay.push(product);
    else {
      product.keyWords.forEach(keyWord => {
        if (keyWord.toLowerCase().includes(searchParam))
          productsToDisplay.push(product);
      });
    }
  });
}

/**
 * helper function for showing and hiding the "added" message
 * hideAddedTimeoutId is a js object that acts like a hash map,
 * the keys are product id and the values are their timeout ids
 * @param {string} productId takes in a parameter of type string to identify the product by its ID
 */
const hideAddedTimeoutId = {};
function showAndHideAdded(productId) {
  const addedToCart = document.querySelector(`.js-added-to-cart${productId}`)
  addedToCart.classList.add('added-to-cart-visible');
  clearTimeout(hideAddedTimeoutId[productId]);
  hideAddedTimeoutId[productId] = setTimeout(() => {
    addedToCart.classList.remove('added-to-cart-visible');
  }, 2000);
}
