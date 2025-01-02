import axios from "axios";
import { Product } from "../types/IProduct";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<{ products: Product[] }>(
      "https://dummyjson.com/products"
    );
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
}
