import { LikeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
export default class LikeRepository {
  constructor() {
    this.LikeModel = mongoose.model("likes", LikeSchema);
  }

  async likeProduct(user_id, product_id) {
    try {
      let new_like = this.LikeModel({
        user_id: new ObjectId(user_id),
        likeable: new ObjectId(product_id),
        MultiReference: "products",
      });
      await new_like.save();
    } catch (error) {
      console.log(error);
    }
  }

  async likeCategory(user_id, category_id) {
    try {
      let new_like = this.LikeModel({
        user_id: new ObjectId(user_id),
        likeable: new ObjectId(category_id),
        MultiReference: "category",
      });
      await new_like.save();
    } catch (error) {
      console.log(error);
    }
  }
  async getAllLikes(type) {
    try {
      return this.LikeModel.find({ MultiReference: type })
        .populate("user_id")
        .populate({ path: 'likeable', model: type });
    } catch (error) {
      console.log(error);
    }
  }
  async getUserLikes(user_id) {
    try {
      return this.LikeModel.find({ user_id: new ObjectId(user_id) });
    } catch (error) {
      console.log(error);
    }
  }
}
