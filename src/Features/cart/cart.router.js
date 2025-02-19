import express from 'express';
import BuyersAccessMiddleware from '../../middleware/BuyersAccess.middleware.js';
import CartController from './cart.controller.js';

// instance of variable
let cartRouter = express.Router();
let cartcontroller = new CartController();

// routes
cartRouter.post('/',BuyersAccessMiddleware,cartcontroller.addToCart.bind(cartcontroller))
cartRouter.get('/items',BuyersAccessMiddleware,cartcontroller.getCartItem.bind(cartcontroller))
cartRouter.delete('/:productId',BuyersAccessMiddleware,cartcontroller.removeCartItem.bind(cartcontroller));

export default cartRouter;