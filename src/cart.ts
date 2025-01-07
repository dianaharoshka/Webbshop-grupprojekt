import { fetchProducts } from "./services/DummyJSONCall";
import { Product } from "./types/IProduct";
import OrderHandler from "./services/StorageHandler"; 


(async () => {
  try {
    const fetchedItems: getAllItems[] = await fetchItems();
    const getAllItems: getAllItems[] = fetchedItems.slice(0, 10);
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
  if (itemsContainer) itemsContainer.appendChild(card);

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

static updateItem(itemToUpdate: Product, changedQuantity: number) {
    const items: Product[] = OrderHandler.getAllItems();
    if (items.find((items) => items.title == itemToUpdate.title)) {
      if (changedQuantity > 0) {
        const existingItems: Product[] = items.filter(
          (items) => items.title != itemToUpdate.title
        );
        itemToUpdate.quantity = changedQuantity;
        existingItems.push(itemToUpdate);
        localStorage.setItem("ItemsOrder", JSON.stringify(existingItems));
      } else {
        const existingItems: Product[] = items.filter(
          (items) => items.title != itemToUpdate.title
        );
        itemToUpdate.quantity = 0;
        localStorage.setItem("ItemsOrder", JSON.stringify(existingItems));
      }
    } else console.log("ERROR");
  }
