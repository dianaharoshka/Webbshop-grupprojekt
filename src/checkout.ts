import FinishedOrder from "./services/orderIdGenerator";
import OrderHandler from "./services/StorageHandler";
import { Product } from "./types/IProduct";

let sum = 0;

const checkoutItemsContainer: HTMLUListElement = document.getElementById(
  "checkout-items"
) as HTMLUListElement;

function renderCart() {
  try {
    checkoutItemsContainer.innerHTML = "";
    sum = 0;

    const products: Product[] = OrderHandler.getAllItems();

    products.forEach((product) => {
      createProductCard(product);
      sum += product.price * product.quantity;
    });

    updateTotalPrice();
  } catch (error) {
    console.error("Error rendering cart:", error);
  }
}

function createProductCard(product: Product): void {
  const card = document.createElement("li");
  card.classList.add("product-card");

  const image = createProductImage(product);
  const title = createProductTitle(product);
  const quantityInput = createQuantityControls(product);
  const removeButton = createRemoveButton(product);
  const price = createProductPrice(product);

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(quantityInput);
  card.appendChild(removeButton);
  card.appendChild(price);

  checkoutItemsContainer.appendChild(card);
}

function createProductImage(product: Product): HTMLImageElement {
  const image = document.createElement("img");
  image.style.width = "100px";
  image.src = product.images[0];
  image.alt = product.title;
  return image;
}

function createProductTitle(product: Product): HTMLParagraphElement {
  const title = document.createElement("p");
  title.classList.add("product-checkout-title");
  title.textContent = product.title;
  return title;
}

function createQuantityControls(product: Product): HTMLElement {
  const quantityControls = document.createElement("div");
  quantityControls.classList.add("quantity-controls");

  const decrementButton = document.createElement("button");
  decrementButton.textContent = "-";
  decrementButton.classList.add("decrement-btn");

  const quantityDisplay = document.createElement("span");
  quantityDisplay.classList.add("quantity-display");
  quantityDisplay.textContent = product.quantity.toString();

  const incrementButton = document.createElement("button");
  incrementButton.textContent = "+";
  incrementButton.classList.add("increment-btn");

  decrementButton.addEventListener("click", () => {
    if (product.quantity > 1) {
      product.quantity -= 1;
      quantityDisplay.textContent = product.quantity.toString();

      OrderHandler.updateItem(product, product.quantity);
      renderCart();
    }
  });

  incrementButton.addEventListener("click", () => {
    product.quantity += 1;
    quantityDisplay.textContent = product.quantity.toString();

    OrderHandler.updateItem(product, product.quantity);
    renderCart();
  });

  quantityControls.appendChild(decrementButton);
  quantityControls.appendChild(quantityDisplay);
  quantityControls.appendChild(incrementButton);

  return quantityControls;
}

function createRemoveButton(product: Product): HTMLButtonElement {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-item-checkout");
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';

  removeButton.addEventListener("click", () => {
    OrderHandler.deleteItem(product);
    renderCart();
  });

  return removeButton;
}

function createProductPrice(product: Product): HTMLDivElement {
  const price = document.createElement("div");
  price.classList.add("product-checkout-price");
  price.textContent = `$${product.price.toFixed(2)}`;
  return price;
}

function updateTotalPrice(): void {
  const priceContainer: HTMLSpanElement = document.getElementById(
    "total-price"
  ) as HTMLSpanElement;

  if (priceContainer) {
    priceContainer.innerText = `Total: $${sum.toFixed(2)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector<HTMLFormElement>(".checkout-form form");
  const mainContainer = document.querySelector("main");

  if (form && mainContainer) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      OrderHandler.clearStorage();

      mainContainer.innerHTML = `
      <section class="confirmation-message">
      <h2>Thank you for your purchase!</h2>
      <p>Order ${FinishedOrder.GenerateId()} has been successfully processed.</p>
      `;
    });
  }
});

renderCart();
