export default class ProductModel {
  constructor(id, name, desc, imageUrl, category, price, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static add(product){
    products.id = products.length + 1;
    products.push(product);
    return product;
  }

  static GetAll(){
    return products;
  }


}

// Example data for testing
const products = [
    new ProductModel(
      1,
      "Atomic Habit",
      "A supremely practical and useful book.",
      300,
      "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
      'Category 1'
    ),
    new ProductModel(
      2,
      "Ikigai",
      "The Japanese secret to a long and happy life",
      340,
      "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
      'Category 2',
      ['S','M']
    ),
    new ProductModel(
      3,
      "Deep Work",
      "RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",
      280,
      "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
      'Category 3',
      ['S']
    ),
  ];