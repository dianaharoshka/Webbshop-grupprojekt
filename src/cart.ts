import { Product } from "./types/IProduct";
import OrderHandler from "./services/StorageHandler"; 

(async () => {
  try {
    const getAllItems: Product[] = OrderHandler.getAllItems()
    console.log("Fetched iteams to cart:", getAllItems);
    getAllItems.forEach((getAllItems) => {
      createProductCard(getAllItems);
    });
    document.createElement("div");
  } catch (error) {
    console.error("Error:", error);
  }
})();

function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("div");
  card.classList.add("product-card");
  if (cartItems) cartItems.appendChild(card);
// "hitta" cartItems 

  const image = document.createElement("img");
  image.classList.add("product-img");
  image.src = product.images[0];
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("p");
  title.classList.add("product-title");
  title.textContent = product.title;
  card.appendChild(title);

  const price = document.createElement("div");
  price.classList.add("product-price");
  price.textContent = `$${product.price.toFixed(2)}`;
  card.appendChild(price);
}

const updateItem = document.createElement("button");
updateItem.classList.add("item-button");
updateItem.textContent = "Update items";
card.appendChild(updateItem);

updateItem.addEventListener("click", () => {
  OrderHandler.updateItem(product, x);
});