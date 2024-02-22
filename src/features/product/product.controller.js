import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProduct(req, res) {
    try {
      const product = await this.productRepository.getAll();
      res.status(200).send(product);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with the database", 500);
    }
  }

  async addProduct(req, res) {
    try {
      console.log(req.body);
      console.log(req.file);
      const { name, price, sizes, categories } = req.body;
      const newProduct = new ProductModel(
        name,
        null,
        parseFloat(price),
        req.file.filename,
        categories,
        sizes.split(",")
      );

      //After pushing new data to the model
      const createdRecord = await this.productRepository.add(newProduct);
      // res.status(201).send(createdRecord);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  async rateProduct(req, res, next) {
    try {
      console.log(req.query);
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      await this.productRepository.rate(userID, productID, rating);

      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong with riview");
      next(err);
    }
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        return res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;
      const result = await this.productRepository.filter(
        minPrice,
        // maxPrice,
        categories
      );
      console.log(result);
      console.log("minPrice:", minPrice);
      console.log("maxPrice:", maxPrice);
      console.log("category:", categories);

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  async averagePrice(req, res, next){
    try{
      const result = await this.productRepository.averageProductPricePerCategory()
      res.status(200).send(result);
    }catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
}
}
