import {Schema} from "mongoose";

export const UserSchema = new Schema({
    name :{type : String , required : true},
    email :{type :String,required : true,unique : true,match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address"]},
    password :String,
    type:{type:String , enum : ['buyer','seller','admin'] , default : 'buyer'}
});
