import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  
    signUp(req, res) {
    const {
    name,
    email,
    password,
    type
    } = req.body;
    const user = UserModel.signUp(
        name,
        email,
        password,
        type
    );
    res.status(201).send(user);
  }

  signIn(req, res) {
      console.log(req.body.email)
    const result = UserModel.signIn(
        req.body.email,
        req.body.password
    );
    if(!result){
        return res.status(400).send("Incorrect Credentials");
    }else{
        //1. Create token
        const token = jwt.sign(
            {
                userID: result.id,
                email: result.email
            },'qazEWYzU8USwNL2hKWz0yVmHGmYocI3T',
            {
                expiresIn : '1h',
            }
        );
        //2. Send token
        return res.status(200).send(token);
    }
  }
}
