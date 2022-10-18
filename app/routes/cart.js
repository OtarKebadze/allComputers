const { Router } = require("express");
const { CartController } = require("../controllers/cart");
const checkAuthenticated = require("../middlewares/auth");

class RouterCart {
    constructor() {
        this.controller = new CartController();
    }
    config() {
        const routerCart = Router();

        routerCart.get("/" , this.controller.getAllCarts)

        routerCart.delete("/" , this.controller.delAllCarts)

        routerCart.post("/:cart_user/products/:id_prod" , checkAuthenticated ,  this.controller.addProdToUserCart)
        
        routerCart.post("/:cart_user/products/:id_prod/removeQty" , checkAuthenticated ,this.controller.removeQty)
        
        routerCart.post("/:cart_user/products/:id_prod/addQty" , checkAuthenticated ,this.controller.addQty)

        routerCart.post("/:cart_user/products/:id_prod/deleteFromCart" , checkAuthenticated ,this.controller.deleteFromCart)

        routerCart.post("/:cart_user/products/:id_prod/addQtyById" , checkAuthenticated ,this.controller.addOneProductById)
        
        routerCart.post("/purchase" , checkAuthenticated ,this.controller.completePurchase)
        
        return routerCart;
    }
}

module.exports = {
    RouterCart,
};
