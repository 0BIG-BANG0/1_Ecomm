
//Manage routes/ paths to ProductController

// 1.Import express.
import express from "express";
import ProductController from "./product.controller.js";

//2. Initialize Express router
const productRouter = express.Router();

//instantiate the product Controller
const productController = new ProductController();


//All the paths to controller methods
//localhost/api/products
productRouter.get("/",productController.getAllProduct)
productRouter.post("/",productController.addProduct)


export default productRouter;