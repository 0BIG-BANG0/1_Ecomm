import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

//creating model from schema ChatGPT : https://chat.openai.com/share/fb30e24c-6437-4f04-923b-7e4ad55ccac8

const UserModel = mongoose.model("User", userSchema);

export default class UserRepository {
  
  async resetPassword(userID, hashedPassword) {
    try {
      let user = await UserModel.findById(userID); //we found the user now update the password
      if (user) {
        user.password = hashedPassword;
        user.save();
      } else {
        throw new Error("No Such User Found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async signUp(user) {
    try {
      //create instance of model
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
      
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        console.log(err);
        throw new ApplicationError(
          "Something went wrong with the database",
          500
        );
      }
    }
  }

  async signIn() {
    try {
      return await UserModel.findOne({ email, password });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
      return newUser;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
}
