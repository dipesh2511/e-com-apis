import { ObjectId, ReturnDocument } from "mongodb";
import { getDb } from "../../config/mongodb.js";
export default class CartRepository {
  async addItem(user_id, product_id, quantity) {
    try {
      let db = await getDb();
      let collection = await db.collection("cart");
      let id;

      let result = await collection.findOne({
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id),
      });

      if (!result) {
        id = await this.cartCollectionIds(db);
        console.log(id);
      }

      if (result?.quantity <= 1 && quantity == -1) {
        return await this.removeItem(user_id, product_id);
      }

      return await collection.updateOne(
        {
          user_id: new ObjectId(user_id),
          product_id: new ObjectId(product_id),
        },
        {
          $inc: {
            quantity: parseInt(quantity),
          },
          $setOnInsert: {
            _id: id,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getItem(user_id) {
    try {
      let db = await getDb();
      let collection = db.collection("cart");
      let result = await collection
        .find({ user_id: new ObjectId(user_id) })
        .project({ _id: 0, user_id: 0})
        .toArray();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async removeItem(user_id, product_id) {
    try {
      let db = await getDb();
      let collection = db.collection("cart");
      return await collection.deleteOne({
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async cartCollectionIds(db) {
    let document = await db.collection("userDefineIds").findOneAndUpdate(
      {
        _id: "cartCollectionId",
      },
      {
        $inc: { value: 1 },
      },
      {
        returnDocument: "after",
      }
    );
    return document.value;
  }
}
