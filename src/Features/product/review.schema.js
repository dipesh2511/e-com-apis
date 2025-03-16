import { Schema } from "mongoose";

export const ReviewSchema = new Schema({
  product_id: { type: Schema.Types.ObjectId, ref: "products" },
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  rating: { type: Number, required: true, max: 5, min: 1 },
});
