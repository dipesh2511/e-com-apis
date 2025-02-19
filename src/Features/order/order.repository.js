import { ObjectId } from "mongodb";
import { getClient, getDb } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(user_id) {
    let db = await getDb();
    let client = await getClient();
    let session = client.startSession();

    try {
      session.startTransaction();
      
      // 1. get cart items and calculate total amount
      let result = await this.getTotalAmount(user_id, session);
      let total_price = result.reduce((acc, value) => acc + value.itemTotal, 0);

      // 2. create an order record
      let orderCollection = db.collection(this.collection);
      let new_order = new OrderModel(user_id, total_price, new Date());
      let order = await orderCollection.insertOne(new_order, { session });

      // 3. Reduce the stock (use for...of to handle async properly)
      let productCollection = db.collection("products");
      for (let item of result) {
        await productCollection.updateOne(
          { _id: new ObjectId(item.product_id) },
          { $inc: { stock: -item.quantity } },
          { session }
        );
      }

      // 4. Clear the cart items
      let cartCollection = db.collection("cart");
      await cartCollection.deleteMany({ user_id: new ObjectId(user_id) }, { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      
      return { total_price, order };
    } catch (error) {
      // In case of an error, abort the transaction
      await session.abortTransaction();
      session.endSession();
      console.log(error);
      throw error;  // Rethrow the error so it can be handled at a higher level
    }
  }

  async getTotalAmount(user_id, session) {
    let db = await getDb();
    let result = db
      .collection("cart")
      .aggregate(
        [
          {
            $match: { user_id: new ObjectId(user_id) },
          },
          {
            $lookup: {
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "product_detail",
            },
          },
          {
            $unwind: "$product_detail",
          },
          {
            $addFields: {
              itemTotal: { $multiply: ["$quantity", "$product_detail.price"] },
            },
          },
        ],
        { session }
      )
      .toArray();
    return result;
  }
}
