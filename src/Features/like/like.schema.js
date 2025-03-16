import { Schema } from "mongoose";
import { type } from "os";

export const LikeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "users" },
  likeable: { type: Schema.Types.ObjectId, ref: "MultiReference" },
  MultiReference: { type: String, enum: ["products", "categories"] },
})
  .pre("find", (next) => {
    console.log("find hook");

    next();
  })
  .post("find", () => {
    console.log("post find hook");
  });
