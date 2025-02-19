import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(location, name, desc, imageUrl, category, price ,stock , sizes = null) {
    this.location = location;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.sizes = sizes;
  }

  static add(location, name, desc, imageUrl, category, price, stock,sizes) {
    let newProduct = new ProductModel(
      location,
      name,
      desc,
      imageUrl,
      category,
      price,
      stock,
      sizes
    );
    return newProduct;
  }

  static filter(minPrice, maxPrice, categories) {
    let filterExpression = {};
    if (minPrice) {
      filterExpression.price = { $gte: parseFloat(minPrice) };
    }
    if (maxPrice) {
      filterExpression.price = {
        ...filterExpression.price,
        $lte: parseFloat(maxPrice),
      };
    }
    if (categories) {
      categories = categories.replace(/'/g, '"');
      categories = JSON.parse(categories);

      // console.log(categories)
      filterExpression.category = { $in:  categories  };
    }
    return filterExpression;
  }
  
}
