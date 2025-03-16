import mongoose from "mongoose";
import { Schema } from "mongoose";

export const ProductSchema = new Schema({
  location: String,
  name: String,
  desc: String,
  imageUrl: String,
  price: Number,
  stock: Number,
  sizes: String,
  ratings: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
});
