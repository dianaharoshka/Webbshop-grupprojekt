import { Product } from "../types/IProduct";

export default class OrderHandler {
  static getAllItems(): Product[] {
    return JSON.parse(localStorage.getItem("ItemsOrder") || "[]");
  }

  static addToCart(orderedItem: Product) {
    const items: Product[] = OrderHandler.getAllItems();
    const existingItem = items.find((item) => item.title == orderedItem.title);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      orderedItem.quantity = 1;
      items.push(orderedItem);
    }

    items.sort((a, b) => a.title.localeCompare(b.title));
    localStorage.setItem("ItemsOrder", JSON.stringify(items));
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
        existingItems.sort((a, b) => a.title.localeCompare(b.title));
        localStorage.setItem("ItemsOrder", JSON.stringify(existingItems));
      } else {
        const existingItems: Product[] = items.filter(
          (items) => items.title != itemToUpdate.title
        );
        itemToUpdate.quantity = 0;
        existingItems.sort((a, b) => a.title.localeCompare(b.title));
        localStorage.setItem("ItemsOrder", JSON.stringify(existingItems));
      }
    } else console.log("ERROR");
  }
  static deleteItem(itemToDelete: Product) {
    const items: Product[] = OrderHandler.getAllItems();
    const newitems = items.filter((items) => items.title != itemToDelete.title);
    localStorage.setItem("ItemsOrder", JSON.stringify(newitems));
  }
  static clearStorage() {
    localStorage.setItem("ItemsOrder", "[]");
  }
}
