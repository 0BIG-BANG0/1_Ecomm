import userModel from "../user/user.model.js"
import { ApplicationError } from "../../error-handler/applicationError.js";


export default class ProductModel {
  constructor( name,
    desc,
    price,
    imageUrl,
    category,
    sizes,
    id
    ) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static add(product) {
    products.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((i) => i.id == id);
    return product;
  }

  static getAll() {
    return products;
  }

  static filter(minPrice,maxPrice, category){

    // console.log('Filtering with minPrice:', minPrice, 'maxPrice:', maxPrice, 'category:', category);

    const result = products.filter((product) =>{
        return (
            product.price >= minPrice &&
            product.price <= maxPrice 
            // product.category == category
            
        );
        
    });
    return result;
  }

  static rateProduct(userID, productID, rating){
    // 1. Validate user and product
    const user = userModel.getAll().find((u) => u.id == userID);
    if(!user){
      // user-defined error
      throw new ApplicationError ("User not found",404);
    }

    //Validate Product
    const product = products.find((p)=> p.id == productID);
    if(!product){
      throw new ApplicationError ("Product not found", 400);
    }

    //2. Check if there are any ratings  if not add ratings array.
    if(!products.ratings){
      product.ratings = [];
      product.ratings.push({
        userID: userID,
        rating: rating,
      })
    } else{
      // 3. Check if user rating is already available.
      const existingRatingIndex = product.rating.findIndex((r) => r.userID == userID
      );
      if(existingRatingIndex >= 0){
        product.rating[existingRatingIndex] = {
          userID: userID,
          rating: rating,
        };
      }else{
        // 4. If no existing rating, then add new rating.
        product.rating.push({
          userID: userID,
          rating: rating,
        });
      }
    }
  }

}

// Example data for testing
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];