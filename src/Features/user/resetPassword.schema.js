import mongoose from "mongoose";
import { Schema } from "mongoose";

export const ResetPasswordSchema = new Schema({
    email: { type: String, required: true , unique : true},
    otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: 60 } // Corrected TTL index
});