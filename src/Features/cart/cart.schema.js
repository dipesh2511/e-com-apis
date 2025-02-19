import mongoose from "mongoose";
import { Schema } from "mongoose"; 

export let CartSchema = mongoose.Schema({
    user_id : {type: Schema.Types.ObjectId, ref : 'users'},
    product_id : {type:Schema.Types.ObjectId,ref : 'products'},
    quantity :Number
})


// export const CartSchema = new Schema({
//     user_id : {type: Schema.Types.ObjectId, ref : 'User'},
//     product_id : {type:Schema.Types.ObjectId,ref : 'Product'},
//     quantity :Number
// }); 