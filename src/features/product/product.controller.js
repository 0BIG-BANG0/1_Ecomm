import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProduct(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    //After pushing new data to the model
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }

  rateProduct(req, res) {
    console.log(req.query)
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    // try{
      ProductModel.rateProduct(
      userID,
      productID,
      rating
    );
    // }catch(err){
    //   return res.status(400).send(err.message);
    // }
    return res.status(200).send("Rating has been added");
    
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.get(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      return res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(
      minPrice,
      maxPrice,
      category
    );
    console.log(result)
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    console.log('category:', category);

    res.status(200).send(result);
  }
}
