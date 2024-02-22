// Importing Mongoose library for MongoDB interactions
import mongoose from "mongoose";

// Defining the like schema
export const likeSchema = new mongoose.Schema({
    // User who performed the like action
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the 'User' collection
    },
    // Item being liked (could be a product or category)
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model' // Reference path to dynamically determine the model
    },
    // Type of object being liked (either 'Product' or 'Category')
    on_model: {
        type: String,
        enum: ['Product', 'Category'] // Valid options for the type of object
    }
}).pre('save',(next)=>{
    console.log("New Like coming in")
    next();
}).post('save', (doc)=>{
    console.log("Like is saved")
    console.log(doc);
}).pre('find', (next)=>{
    console.log("Retrieving Likes");
    next();
}).post('find', (docs)=>{
    console.log("Post find")
    console.log(docs)
})
