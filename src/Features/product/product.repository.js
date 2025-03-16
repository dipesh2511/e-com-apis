import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import { ProductSchema } from "./product.schema.js";
import mongoose, { mongo } from "mongoose";
import { ReviewSchema } from "./review.schema.js";
import { CategoryModel, CategorySchema } from "./category.schema.js";
export default class ProductRepository {
  constructor() {
    this.productModel = mongoose.model("products", ProductSchema);
    this.reviewModel = mongoose.model("reviews", ReviewSchema);
    this.CategoryModel = CategoryModel;
  }

  async getAll() {
    try {
      let result = await this.productModel.find().populate("ratings");
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async addProduct(new_product) {
    try {
      // add new product
      let product = new this.productModel(new_product);
      product.categories = new_product.categories
        .split(",")
        .map((r) => r.trim());
      let saved_product = await product.save();

      //update review repository
      await this.CategoryModel.updateMany(
        { _id: { $in: product.categories } },
        { $push: { products: new ObjectId(saved_product._id) } },
      );
    } catch (err) {
      console.log(err);
    }
  }
  async oneProduct(id) {
    try {
      let result = await this.productModel
        .findOne({ _id: new ObjectId(id) })
        .populate("ratings","categories");
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async rate(user_id, product_id, rating) {
    try {
      // 1. Find the product
      let product = await this.productModel.findOne({
        _id: new ObjectId(product_id),
      });

      if (!product) {
        throw new Error("Product not found");
      }

      // 2. Check if the user has already rated the product
      let rated_product = await this.reviewModel.findOne({
        user_id: new ObjectId(user_id),
        product_id: new ObjectId(product_id),
      });

      if (rated_product) {
        // 3. Update existing rating
        rated_product.rating = rating;
        await rated_product.save();
      } else {
        // 4. Create new review
        let new_review = new this.reviewModel({
          user_id: new ObjectId(user_id),
          product_id: new ObjectId(product_id),
          rating: rating,
        });
        await new_review.save();

        // 5. Push the new review's ObjectId into the product's ratings array
        await this.productModel.findByIdAndUpdate(
          product_id,
          { $push: { ratings: new_review._id } },
          { new: true }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async averagePricePerCategory() {
    try {
      let db = await getDb();
      return await db
        .collection("products")
        .aggregate([
          {
            $group: { _id: "$category", averagePrice: { $avg: "$price" } },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
    }
  }
}
