import { ObjectId } from "mongodb";

export default class OrderModel {
  constructor(user_id , totalPrice,date) {
    this.user_id = new ObjectId (user_id);
    this.totalPrice = totalPrice;
    this.date = date;
  }
}
