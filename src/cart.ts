import OrderHandler from "./services/StorageHandler";
import { Product } from "./types/IProduct";

let sum = 0;

const cartItemsContainer: HTMLDivElement = document.getElementById(
  "cartItems"
) as HTMLDivElement;

function renderCart() {
  try {
    cartItemsContainer.innerHTML = "";
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
  const card = document.createElement("div");
  card.classList.add("cart-card");

  const title = createProductTitle(product);
  const quantityInput = createQuantityControls(product);
  const removeButton = createRemoveButton(product);
  const price = createProductPrice(product);

  card.appendChild(title);
  card.appendChild(quantityInput);
  card.appendChild(removeButton);
  card.appendChild(price);

  cartItemsContainer.appendChild(card);
}

function createProductTitle(product: Product): HTMLParagraphElement {
  const title = document.createElement("p");
  title.classList.add("product-cart-title");
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
  removeButton.classList.add("remove-item-cart");
  removeButton.textContent = "Remove item";

  removeButton.addEventListener("click", () => {
    OrderHandler.deleteItem(product);
    renderCart();
  });

  return removeButton;
}

function createProductPrice(product: Product): HTMLDivElement {
  const price = document.createElement("div");
  price.classList.add("product-cart-price");
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

renderCart();

const cartButton: HTMLButtonElement = document.getElementById(
  "checkout-navigator-btn"
) as HTMLButtonElement;

cartButton.addEventListener("click", () => {
  window.location.href = "/payment-page";
});
