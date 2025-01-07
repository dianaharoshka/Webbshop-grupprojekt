import { v4 as uuidv4 } from "uuid";
import Iorder from "../types/IOrder";

export default class FinishedOrder {
  static GetOrderId() {
    return JSON.parse(localStorage.getItem("generatedOrderID") || "[]");
  }

  static GenerateId() {
    const generatedID: string = uuidv4();
    const orders: Iorder[] = FinishedOrder.GetOrderId();
    if (orders.find((orders) => orders.id != generatedID)) {
      const newOrders: Iorder[] = orders;
      let newOrder: Iorder = {
        id: generatedID,
      };
      newOrders.push(newOrder);
      localStorage.setItem("generatedOrderID", JSON.stringify(newOrders));
    } else console.log("ERROR");

    return generatedID;
  }
}
