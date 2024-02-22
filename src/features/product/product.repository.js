import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
// import ProductModel from "./product.model.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);
const CategoryModel = mongoose.model("Category", categorySchema)

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(productData) {
    try {
        // 1. Adding Product
        productData.categories = productData.category.split(',');
        console.log(productData)
      const newProduct  = new ProductModel(productData)
      const savedProduct = await newProduct.save()

      // 2. Update categories
      await CategoryModel.updateMany(
        {_id: {$in: productData.categories}},
        {$push: {products: new ObjectId(savedProduct._id)}}
      )
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async getAll() {
    try {
      //1. Get the db
      const db = getDB();
      const collection = db.collection(this.collection);

      // use find to get all products
      const products = await collection.find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async get(id) {
    try {
      //1. Get the db
      const db = getDB();
      const collection = db.collection(this.collection);

      // use find to get all products
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
  // Product should have min price specified and category
  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //     filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) }//...filterExpression.price > it extends it rather than overiding
      // }
      //['Cat1', 'Cat2']
      categories = JSON.parse(categories.replace(/'/g, '"'));
      if (categories) {
        filterExpression = {
          $or: [{ category: { $in: categories } }, filterExpression],
        };
        // filterExpression.category = category
      }
      return await collection
        .find(filterExpression)
        .project({ name: 1, price: 1, _id: 0, ratings: { $slice: -1 } })
        .toArray(); // toArray() is used to return more than one result
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async rate(userID, productID, rating) {
    try {
      //1. Check if product Exist
      const productToUpdate = await ProductModel.findById(productID);
      if (!productToUpdate) {
        throw new Error("Product not found");
      }
      //Find the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        newReview.save();
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  // ChatGPT : https://chat.openai.com/share/4530f21e-73e2-449b-9665-dd67bd817017
  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collection)
        .aggregate([
          {
            //Stage 1: Get average price per category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }
}

export default ProductRepository;
