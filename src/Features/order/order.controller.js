import OrderRepository from "./order.repository.js";
export default class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async placeOrder(req, res, next) {
    try {
      let result = await this.orderRepository.placeOrder(req.u_Id);
      // console.log(result)
      res.status(200).json({ result, message: "Order placed successfully" });

    } catch (error) {
      console.log(error);
    }
  }
}
