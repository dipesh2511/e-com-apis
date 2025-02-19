import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import mongoose from "mongoose";
import { UserSchema } from "./user.schema.js";
import { ResetPasswordSchema } from "./resetPassword.schema.js";
import ApplicationLevelError from "../../dynamicerror/applicationlevelerror.js";

export default class UserRepository {
  constructor() {
    this.UserModel = mongoose.model("users", UserSchema);
    this.ResetPasswordModel = mongoose.model(
      "resetpasswords",
      ResetPasswordSchema
    );
  }
  async findByEmailAndOtp(email, otp) {
    try {
      const now = new Date();
      const result = await this.ResetPasswordModel.deleteMany({
        created_at: { $lt: new Date(now - 60 * 1000) },
      });

      let user = await this.ResetPasswordModel.findOne({
        email: email,
        otp: otp,
      });

      return !!user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async setResetPasswordProfile(userDetail) {
    try {
      let new_user = await new this.ResetPasswordModel(userDetail);
      await new_user.save()
      
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(id, password) {
    try {
      return await this.UserModel.updateOne(
        { _id: new ObjectId(id) },
        { $set: { password: password } }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(new_user) {
    try {
      const newUser = new this.UserModel(new_user);
      return await newUser.save();
    } catch (err) {
      console.log(err)
      if(err instanceof mongoose.Error.ValidationError){
        throw new ApplicationLevelError(err, 400);
      }

      if (err.errorResponse.errmsg) {
        throw new ApplicationLevelError(err.errorResponse.errmsg, 400);
      }
      throw new Error(err)
    }
  }

  async signIn(parameter) {
    try {
      //   let db = await getDb();
      //   let collection = db.collection("users");
      //   return await collection.findOne(parameter);
      return await this.UserModel.findOne(parameter);
    } catch (err) {
      console.log(err);
    }
  }
}
