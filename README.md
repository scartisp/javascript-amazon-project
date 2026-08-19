## JavaScript Amazon Project

A vanilla JavaScript e-commerce front end modeled on Amazon: a product catalog, cart, checkout flow, and order tracking, built without a framework. Product and order data are served by a REST API, with cart and order state persisted in `localStorage`. A live version of the site is available via the GitHub Pages link attached to this repository.

### Repo structure

```
amazon.html, checkout.html, orders.html, tracking.html   Page entry points
scripts/
  amazon.js, checkout.js, orders.js, tracking.js         Per-page controllers
  searchBar.js                                            Shared search bar behavior
  checkout/
    orderSummary.js                                       Cart list + delivery option rendering
    paymentSummary.js                                      Cost breakdown + order placement
    checkoutHeader.js                                      Checkout page header/cart count
  utils/money.js                                           Cents-to-dollars formatting
data/
  products.js                                              Product classes + API fetch
  cart.js, orders.js, deliveryOptions.js                   State modules (localStorage-backed)
styles/
  shared/                                                   Header and base styles
  pages/                                                     Per-page stylesheets
images/                                                      Product, icon, and rating assets
backend/products.json                                       Static reference copy of catalog data
```

Each HTML page loads a single controller script as an ES module (e.g. `amazon.html` → `scripts/amazon.js`). Controllers import from `data/` for state and from shared modules like `searchBar.js` for cross-page behavior, then render their section of the DOM directly via template strings — there is no virtual DOM or templating library.

### Design choices

**Product class hierarchy.** `data/products.js` defines a base `Product` class with `Clothing` and `Appliance` subclasses. Each overrides `extraInfoHTML()` to inject product-specific markup (a size chart link for clothing, instructions/warranty links for appliances), so the product grid renderer in `amazon.js` can call `product.extraInfoHTML()` polymorphically without branching on product type.

**Shared search module.** `searchBar.js` is a single module consumed by every page (`amazon.js`, `orders.js`, `tracking.js`). It attaches both a click listener and an Enter-key listener to the same search bar, and redirects to `amazon.html` with the query encoded as a URL parameter, keeping search behavior consistent across the site without duplicating logic per page.

**Checkout composition.** `checkout.js` acts as an orchestrator: it loads product data once, then calls three independent render functions — `renderOrderSummary()`, `renderPaymentSummary()`, and `renderCheckoutHeader()` — each owned by its own module in `scripts/checkout/`. These modules aren't purely one-directional: user actions inside `orderSummary.js` (deleting an item, changing quantity, switching a delivery option) explicitly re-invoke `renderPaymentSummary()` and `renderCheckoutHeader()` afterward, which is how totals and the cart count stay in sync without a reactive framework.

**Order tracking math.** `tracking.js` computes delivery progress by diffing the current date against the order date and estimated arrival date to derive a percentage, which drives both the progress bar width and which stage (Preparing/Shipped/Delivered) is marked active. Because the backend's estimated delivery dates don't account for weekends, `findArrivalDate()` in `data/orders.js` recalculates the arrival date by walking forward day-by-day and skipping Saturdays/Sundays.

**Async flow and REST API usage.** `loadProducts()` in `data/products.js` wraps a `fetch()` call in a `.then()` chain, checks `response.ok` before parsing, and rethrows on failure so callers can react to load errors. Every page controller uses top-level `await loadProducts()` to block rendering until the catalog is available before touching the DOM. Placing an order in `paymentSummary.js` uses `async/await` with `try/catch` instead: it issues a `POST` request to `/orders` with the cart as the JSON body, then uses the returned order object to update local state and redirect to the orders page. The two calls intentionally use different styles — `loadProducts()` (a GET, awaited at module load) reads naturally as a promise chain, while order placement (a POST triggered by a user click, with error handling around it) reads naturally as `async/await`.

---

## Initial HTML provided by SuperSimpleDev

### Important note

The current version of this project does not make use of the `Appliance` class for appliance products. This is because the external backend used for products does not include this type. However, for scalability and potential new features, the functionality remains.
