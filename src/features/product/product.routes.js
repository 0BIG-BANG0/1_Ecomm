
//Manage routes/ paths to ProductController

// 1.Import express.
import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileupload.middleware.js"
import jwtAuth from '../../middlewares/jwt.middleware.js'

//2. Initialize Express router
const productRouter = express.Router();

//instantiate the product Controller
const productController = new ProductController();


//All the paths to controller methods
//localhost/api/products

// localhost:4100/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.post("/rate", jwtAuth, (req, res, next) => { productController.rateProduct(req, res, next) });

productRouter.get("/filter", (req, res) => { productController.filterProducts(req, res) })

productRouter.get("/", (req, res) => { productController.getAllProduct(req, res) })

productRouter.post("/", upload.single('imageUrl'), (req, res) => { productController.addProduct(req, res) })

productRouter.get("/averagePrice", (req,res,next)=>{
    productController.averagePrice(req,res)
}) // This average price router should come before the upcoming router which is id because otherwise it will consider it an ID
productRouter.get('/:id', (req, res) => { productController.getOneProduct(req, res) })


export default productRouter;