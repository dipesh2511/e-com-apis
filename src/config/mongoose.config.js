import mongoose from "mongoose";
import { CategoryModel } from "../Features/product/category.schema.js";

async function createDefaultCategories() {
  let result = await CategoryModel.find();
  if (result.length === 0 ) {
    await CategoryModel.insertMany([{name : 'Electronic'},{name : 'Plastic'},{name : 'Leather'}]);
  }
  return;
}
export default async () => {
  try {
    // Below method is depricated in node 4 and above
    // await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    });
    await createDefaultCategories()
    console.log("Connected to MongoDB via mongoose");
  } catch (error) {
    console.log("Failed to connect to MongoDB via mongoose", error);
  }
};
