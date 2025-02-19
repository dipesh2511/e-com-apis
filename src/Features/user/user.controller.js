import UserModel from "./user.model.js";
import UserRepository from "./user.respository.js";
import ResetPasswordModel from "./resert.passowrd.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationLevelError from "../../dynamicerror/applicationlevelerror.js";
import { Mongoose } from "mongoose";
export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(req, res, next) {
    try {
      let result = UserModel.signUp(req.body);
      result.password = await bcrypt.hash(result.password, 12);
      result = await this.userRepository.signUp(result);

      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      
      next(err);
    }
  }

  async logIn(req, res) {
    try {
      let { email, password } = req.body;
      let filter = UserModel.signIn(email);
      let profile = await this.userRepository.signIn(filter);
      if (profile) {
        let password_matched = await bcrypt.compare(password, profile.password);
        if (password_matched) {
          req.session.key = "thissession";

          // create token
          let token = jwt.sign(
            {
              u_Id: profile._id,
              u_email: profile.email,
              u_type: profile.type,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1 year",
            }
          );

          res.set("authorization", token).status(200).send(token);
        } else {
          res.status(400).send("NOt register SignUp First");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getResetPassword(req, res, next) {
    try {
      let { email } = req.body;
      // checking if this email exist on the databse or not

      let filter = UserModel.signIn(email);
      let profile = await this.userRepository.signIn(filter);

      if (!profile) {
        throw new ApplicationLevelError("wrong email", 404);
      }

      let otp = ResetPasswordModel.createOtp();
      let newResetPassword = new ResetPasswordModel(email, otp);
      await this.userRepository.setResetPasswordProfile(newResetPassword);
      await ResetPasswordModel.sendOtp(email, otp);
      res.status(201).send("otp sent successfully");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async setPassword(req, res, next) {
    try {
      let { email, otp, new_password } = req.body;
      let otp_present = await this.userRepository.findByEmailAndOtp(email, otp);
      console.log(otp_present)

      if (!otp_present) {
        throw new ApplicationLevelError("Otp is expired generate new otp", 401);
      }

      if (otp_present) {
        let filter = UserModel.signIn(email);
        let user = await this.userRepository.signIn(filter);
        let password = await bcrypt.hash(new_password,12);
        let result = await this.userRepository.resetPassword(user.id , password); 
        res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  logOut(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        return res.set("authorization", "").send("Logout successfully");
      }
    });
  }
}
