import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";
export default class CartController {
    constructor() {
        this.cartrepository = new CartRepository();
    }
    async addToCart(req, res) {
        let { productId, quantity } = req.query;
        try {
            let result = await this.cartrepository.addItem(req.u_Id, productId, quantity);
            res.status(200).send(result)
        } catch (err) {
            console.log(err);
        }

    }
    async getCartItem(req, res) {
        try {
            let result = await this.cartrepository.getItem(req.u_Id);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send("No Products in the cart")
            }
        } catch (err) {
            console.log(err);
        }

    }
    async removeCartItem(req, res) {
        let productId  = req.params.productId;
        try {
            let result = await this.cartrepository.removeItem(req.u_Id, productId);
            if (result.deletedCount>0) {
                res.status(200).send("successfully deleted")
            } else {
                res.status(404).send("no such product found")
            }
        } catch (err) {
            console.log(err)
        }
    }
}