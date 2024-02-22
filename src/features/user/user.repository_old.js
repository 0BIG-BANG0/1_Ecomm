import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class UserRepository{
  constructor(){
    this.collection = "users"
  }
    async signUp(newUser) {
        try{
        //1.Get the database
        const db = getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection);
        // 3. Insert the Document
        await collection.insertOne(newUser);
        return newUser
        }catch(err){
            console.log(err)
          throw new ApplicationError("Something went wrong with the database", 500)
        }
    }

    async signIn(email, password) {
        try{
        //1.Get the database
        const db = getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection);
        // 3. Insert the Document
        return await collection.findOne({email, password});
        return newUser
        }catch(err){
            console.log(err)
          throw new ApplicationError("Something went wrong with the database", 500)
        }
    }
    async findByEmail(email) {
        try{
        //1.Get the database
        const db = getDB();
        //2. Get the Collection
        const collection = db.collection(this.collection);
        // 3. Insert the Document
        return await collection.findOne({email});
        return newUser
        }catch(err){
            console.log(err)
          throw new ApplicationError("Something went wrong with the database", 500)
        }
    }

}

export default UserRepository