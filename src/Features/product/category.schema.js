import mongoose, { Schema } from "mongoose";

export const CategorySchema = new Schema({
  name: { type: String },
  products: [{type: Schema.Types.ObjectId,ref: "products",}],
});

export let CategoryModel = mongoose.model('categories',CategorySchema);