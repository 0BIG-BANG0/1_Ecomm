
//Manage routes/ paths to ProductController

// 1.Import express.
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileupload.middleware.js"

//2. Initialize Express router
const productRouter = express.Router();

//instantiate the product Controller
const productController = new ProductController();


//All the paths to controller methods
//localhost/api/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get("/filter", productController.filterProducts)
productRouter.get("/",productController.getAllProduct)
productRouter.post("/",upload.single('imageUrl') ,productController.addProduct)
productRouter.get('/:id',productController.getOneProduct)


export default productRouter;