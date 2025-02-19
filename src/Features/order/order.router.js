import express from "express";
import OrderController from "./order.controller.js";

let orderRouter = express.Router();
let orderController = new OrderController();

orderRouter.post("/place-order",orderController.placeOrder.bind(orderController)
);

export default orderRouter;
