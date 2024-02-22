import mongoose from "mongoose";

import "../../env.js";
import { categorySchema } from "../features/product/category.schema.js";

const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected using Mongoose");
    addCategories();
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};

async function addCategories() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = CategoryModel.find();
  if (!categories || (await categories).length == 0) {
    await CategoryModel.insertMany([
      { name: "Books" },
      { name: "Clothing" },
      { name: "Electronics" },
    ]);
  }
  console.log("Categories added");
}
