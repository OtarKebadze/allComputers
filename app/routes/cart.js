const { Router } = require("express");
const { CartController } = require("../controllers/cart");

class RouterCart {
    constructor() {
        this.controller = new CartController();
    }
    config() {
        const routerCart = Router();

        routerCart.get("/" , this.controller.getAllCarts)

        routerCart.delete("/" , this.controller.delAllCarts)

        routerCart.post("/:cart_user/products/:id_prod" , this.controller.addProdToUserCart)

        return routerCart;
    }
}

module.exports = {
    RouterCart,
};
