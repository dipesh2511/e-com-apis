// importing all dependencies
import express from 'express';
import ProductController from './product.controller.js';
import upload from '../../middleware/multer.middleware.js';
// creating all variables
let productRouter = express.Router();
let productController = new ProductController();


// all product routes
// always put your dynamic routes before static routes 
productRouter.get('/filter',productController.filterProduct.bind(productController));
productRouter.get('/average-price',productController.averagePricePerCategory.bind(productController));
productRouter.post('/rate',productController.rateProduct.bind(productController));
productRouter.get('/:id', productController.getOneProduct.bind(productController));
productRouter.get('/', productController.getAllProduct.bind(productController));
productRouter.post('/', upload.single('resume'),productController.addProduct.bind(productController));



// exporting product router to the main file to include it in application level middleware
export default productRouter;