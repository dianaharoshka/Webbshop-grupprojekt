import FinishedOrder from "./services/orderIdGenerator";
import OrderHandler from "./services/StorageHandler";
import { Product } from "./types/IProduct";

let sum = 0;

const checkoutItemsContainer: HTMLUListElement = document.getElementById(
  "checkout-items"
) as HTMLUListElement;

try {
  const products: Product[] = OrderHandler.getAllItems();
  products.forEach((product) => {
    updateTotalPrice(product.price, product.quantity);
    createProductCard(product);
  });
} catch (error) {
  console.error("Error:", error);
}

function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("li");
  card.classList.add("product-card");
  if (checkoutItemsContainer) checkoutItemsContainer.appendChild(card);

  const image = document.createElement("img");
  image.style.width = "100px";
  image.src = product.images[0];
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("p");
  title.classList.add("product-checkout-title");
  title.textContent = product.title;
  card.appendChild(title);

  const quantity = document.createElement("input");
  quantity.type = "number";
  quantity.classList.add("product-checkout-quantity");
  quantity.value = product.quantity.toString();
  quantity.step = "1";

  quantity.addEventListener("input", (e) => {
    const newQuantity = parseInt((e.target as HTMLInputElement).value, 10) || 1;
    product.quantity = newQuantity;
    OrderHandler.updateItem(product, newQuantity);
    updateTotalPrice(product.price, product.quantity);
  });
  card.appendChild(quantity);

  const price = document.createElement("div");
  price.classList.add("product-checkout-price");
  price.textContent = `$${product.price.toFixed(2)}`;
  card.appendChild(price);

  return card;
}

function updateTotalPrice(price: number, quantity: number) {
  sum += price * quantity;

  const priceContainer: HTMLSpanElement = document.getElementById(
    "total-price"
  ) as HTMLSpanElement;
  priceContainer.innerText = `$${sum.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>(".checkout-form form");
  const mainContainer = document.querySelector("main");

  if (form && mainContainer) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      mainContainer.innerHTML = `
      <section class="confirmation-message">
      <h2>Thank you for your purchase!</h2>
      <p>Order ${FinishedOrder.GenerateId()} has been successfully processed.</p>
      `;
    });
  }
});
