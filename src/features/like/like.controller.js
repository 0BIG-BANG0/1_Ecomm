// Importing the LikeRepository class from the like.repository.js file
import { LikeRepository } from "./like.repository.js";

// Controller class responsible for handling like-related HTTP requests
export class LikeController {
  // Constructor method to initialize the LikeController
  constructor() {
    // Creating an instance of the LikeRepository class
    this.likerepository = new LikeRepository();
  }

  async getLikes(req, res, next){
    try {
        // Extracting 'id' and 'type' from the request query parameters
        const {id, type} = req.query;
        
        // Attempting to retrieve likes for the specified resource
        const likes = await this.likerepository.getLikes(type, id);
        
        // Sending a successful response with retrieved likes
        return res.status(200).send(likes);
    } catch (err) {
        // Logging any errors that occur during the process
        console.error(err);
        
        // Sending a 400 Bad Request response with an error message
        return res.status(400).send("Something went wrong");
    }
}


  // Method to handle liking an item (product or category)
  async likeItem(req, res) {
    try {
      // Extracting id and type from the request body
      const { id, type } = req.body;

      // Validating the type of the item
      if (type !== "Product" && type !== "Category") {
        // If the type is neither 'Product' nor 'Category', sending a 400 Bad Request response
        return res.status(400).send("Invalid type");
      }

      // Determining whether the item is a product or a category and performing the like operation accordingly
      if (type === "Product") {
        // If the item is a product, invoking the likeProduct method from the LikeRepository
        await this.likerepository.likeProduct(req.userID, id);
        res.status(201).send("Product Liked");
      } else {
        // If the item is a category, invoking the likeCategory method from the LikeRepository
        await this.likerepository.likeCategory(req.userID, id);
        res.status(201).send("Category Liked");
      }
    } catch (err) {
      // Handling any errors that occur during the process
      console.log(err);
      // Sending a 400 Bad Request response with an error message
      return res.status(400).send("Something went wrong");
    }
  }
}

/*
for LikeItem 
Explanation for each comment:

Importing the LikeRepository class: This comment explains why we import the LikeRepository class. We do this to utilize the methods defined in the LikeRepository for interacting with the database.

Controller class responsibility: This comment clarifies that this class is responsible for handling HTTP requests related to likes.

Constructor method: Here, the constructor initializes an instance of the LikeRepository class, allowing the controller to use its methods.

Method for handling liking an item: This comment describes the purpose of the likeItem method, which is to handle requests for liking an item.

Extracting id and type from the request body: Explains why we're extracting the id and type from the request body, which are needed to identify the item being liked and its type.

Validating the type of the item: This comment explains the purpose of the type validation, ensuring that the item type is either 'Product' or 'Category'.

Determining the type of item and performing like operation: Clarifies the conditional logic to determine whether the item is a product or a category, then invoking the appropriate method from the LikeRepository based on the type.

Error handling: Describes the error handling mechanism in case an error occurs during the like operation, including logging the error and sending a relevant response to the client.


Explain req.userId and id what is there role and why it is used 
ChatGPT
Certainly! Let's delve into the purpose and role of req.userID and id:

req.userID:

req.userID typically represents the user ID of the user who is performing the action associated with the HTTP request.
It's commonly utilized in web applications where user authentication is implemented. After a user logs in, their user ID is often stored in the session or token, and middleware extracts it and attaches it to the request object (req) for subsequent requests.
In the context of this code, req.userID is expected to contain the ID of the authenticated user who is performing the "like" action. This user ID is crucial for associating the like action with the correct user in the database.
id:

The id variable represents the unique identifier of the item (either a product or a category) that is being liked.
It's extracted from the request body (req.body.id), indicating that the client must include the ID of the item they want to like in the request payload.
The id is essential for identifying the specific item that the user wants to like. It allows the application to retrieve the corresponding item from the database and perform the like action on it.
In summary, req.userID is used to identify the authenticated user who is performing the action, while id is used to specify the particular item (product or category) that the user wants to like. These identifiers play a crucial role in associating the like action with the correct user and item in the database.


*/
