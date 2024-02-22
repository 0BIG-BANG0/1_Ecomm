import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

// Creating a Mongoose model for the Like collection using the likeSchema
const LikeModel = mongoose.model("Like", likeSchema);

export class LikeRepository {

  async getLikes(type, id) {
    // Fetching likes associated with a specific type and id
    return await LikeModel.find({
        // Querying for likes based on the provided 'id' and 'type'
        likeable: new ObjectId(id),
        on_model: type,
    })
    // Populating the 'user' field to retrieve additional user information for each like
    .populate('user')
    // Populating the 'likeable' field to retrieve details about the liked entity
    .populate({ path: 'likeable', model: type });
}


  // Method for liking a product
  async likeProduct(userId, productId) {
    try {
      // Creating a new Like document for the liked product
      const newLike = new LikeModel({
        user: new ObjectId(userId), // Assigning the user's ObjectId
        likeable: new ObjectId(productId), // Assigning the product's ObjectId
        on_model: "Product", // Specifying that the like is for a product
      });
      // Saving the new like document to the database
      await newLike.save();
    } catch (err) {
      // Handling any errors that occur during the process
      console.log(err);
      // Throwing an application error with a relevant message
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  // Method for liking a category
  async likeCategory(userId, categoryId) {
    try {
      // Creating a new Like document for the liked category
      const newLike = new LikeModel({
        user: new ObjectId(userId), // Assigning the user's ObjectId
        likeable: new ObjectId(categoryId), // Assigning the category's ObjectId
        on_model: "Category", // Specifying that the like is for a category
      });
      // Saving the new like document to the database
      await newLike.save();
    } catch (err) {
      // Handling any errors that occur during the process
      console.log(err);
      // Throwing an application error with a relevant message
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
}


/*
********getLike********

Explanation:

This function retrieves likes associated with a specific type and id.
The LikeModel is assumed to be a model representing likes in a MongoDB database.
We use the find method to query the LikeModel collection based on the provided 'id' and 'type'.
The 'likeable' field is expected to store the ObjectId of the liked entity, hence we query for likes with a matching likeable ObjectId.
The 'on_model' field stores the type of the liked entity, which is used as a filter for the query.
We use the populate method to include additional information related to each like:
The 'user' field is populated to retrieve details about the user who performed the like.
The 'likeable' field is populated to retrieve details about the entity that was liked. The model option specifies the type of the entity (e.g., 'Post', 'Comment').
By populating these fields, we enrich the returned likes with associated user and likeable entity information, providing more context to the client application when displaying likes.

*/