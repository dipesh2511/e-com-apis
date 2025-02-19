import mongoose from "mongoose";
import { Schema } from "mongoose";

export const  productSchema = new Schema({
    location : String, 
    name : String,
    desc: String,
    imageUrl: String,
    category: String,
    price: Number,
    stock: Number,
    sizes: String
});