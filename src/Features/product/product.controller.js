import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "../user/user.respository.js";
import path from "path";
export default class ProductController {
  constructor() {
    this.productrepository = new ProductRepository();
    this.userrepository = new UserRepository();
  }
  async getAllProduct(req, res) {
    let result = await this.productrepository.getAll();
    if (result) {
      return res.status(200).send(result);
    } else {
      res.status(404).send("Non product found");
    }
  }

  async addProduct(req, res) {
    let { name, desc, imageUrl, category, price, stock,sizes } = req.body;
    let location = `resume/${req.file.filename}`;
    let splitSizes = !sizes ? (sizes = null) : sizes.split(",");
    let result = ProductModel.add(
      location,
      name,
      desc,
      imageUrl,
      category,
      price,
      stock,
      splitSizes
    );
    try {
      let new_product = await this.productrepository.addProduct(result);
      if (new_product) {
        res.status(201).send(new_product);
      } else {
        res.status(404).send("Not able to add product");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOneProduct(req, res) {
    let { id } = req.params;
    console.log(id)
    try {
      let result = await this.productrepository.oneProduct(id);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send("Not found requested product");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async filterProduct(req, res) {
    let { minPrice, maxPrice, categories } = req.query;
    let filter = ProductModel.filter(minPrice, maxPrice, categories);
    try {
      let result = await this.productrepository.filter(filter);
      if (result) {
        res.status(200).send(result);
      } else {
        res.send("none such product available");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async rateProduct(req, res) {
    let { product_id, rating } = req.query;
    try {
      let updated_product = await this.productrepository.rate(
        req.u_Id,
        product_id,
        rating
      );
      res.status(200).send("rating added successfully");
    } catch (err) {
      console.log(err);
    }
  }

  async averagePricePerCategory(req, res) {
    try {
      let result = await this.productrepository.averagePricePerCategory();
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}
