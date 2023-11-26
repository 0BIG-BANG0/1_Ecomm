import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct(req, res) {
    const product = ProductModel.GetAll(); 
    res.status(200).send(product);
  }

  addProduct(req, res) {
    const{name,price,sizes} = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(','),
      imageUrl: req.file.filename,
    };
    //After pushing new data to the model 
   const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord)
  }

  rateProduct(req, res) {}

  getOneProduct(req, res) {}
}
