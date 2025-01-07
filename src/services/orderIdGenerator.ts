import { v4 as uuidv4 } from "uuid";
import Iorder from "../types/IOrder";

export default class FinishedOrder {
  static GetOrderId() {
    return JSON.parse(localStorage.getItem("generatedOrderID") || "[]");
  }

  static GenerateId() {
    const orders: Iorder[] = FinishedOrder.GetOrderId();
    const generatedID: string = uuidv4();

    if (orders.some((order) => order.id === generatedID)) {
      console.log("ERROR: Duplicate order ID");
      return null;
    }

    const newOrder: Iorder = { id: generatedID };
    const newOrders: Iorder[] = [...orders, newOrder];

    localStorage.setItem("generatedOrderID", JSON.stringify(newOrders));

    return generatedID;
  }
}
