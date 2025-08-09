import { fetchProducts } from "./services/DummyJSONCall";
import { Product } from "./types/IProduct";
import OrderHandler from "./services/StorageHandler";
// import FinishedOrder from "./services/orderIdGenerator";

const productContainer = document.getElementById("products-container");

(async () => {
  try {
    const fetchedProducts: Product[] = await fetchProducts();
    const products: Product[] = fetchedProducts.slice(0, 10);
    // console.log("Fetched products:", products);
    products.forEach((product) => {
      createProductCard(product);
    });
    document.createElement("div");
  } catch (error) {
    console.error("Error:", error);
  }
})();

function createProductCard(product: Product): HTMLElement {
  const card = document.createElement("div");
  card.classList.add("product-card");
  if (productContainer) productContainer.appendChild(card);

  const image = document.createElement("img");
  image.classList.add("product-img");
  image.src = product.images[0];
  image.alt = product.title;
  card.appendChild(image);

  const title = document.createElement("p");
  title.classList.add("product-title");
  title.textContent = product.title;
  card.appendChild(title);

  const description = document.createElement("p");
  description.classList.add("product-description");
  description.textContent = product.description;
  card.appendChild(description);

  const price = document.createElement("div");
  price.classList.add("product-price");
  price.textContent = `$${product.price.toFixed(2)}`;
  card.appendChild(price);

  const addToCart = document.createElement("button");
  addToCart.classList.add("card-button");
  addToCart.textContent = "Add to cart";
  card.appendChild(addToCart);

  addToCart.addEventListener("click", () => {
    OrderHandler.addToCart(product);
  });

  return card;
}
