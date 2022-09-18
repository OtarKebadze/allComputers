const { DaoProductMongoose } = require("../daos/daosProductMongoose");
const { CartService } = require("../services/cart");
const { PORT } = require("../../config/index")

class CartController {
    constructor() {
        this.service = new CartService();
        //this.productDao = new DaoProductMongoose();
    }

    getAllCarts = async (req, res) => {
        let cart = await this.service.getAllCartsFromDb();
        console.log(cart);
    };

    delAllCarts = async (req, res) => {
        let cart = await this.service.delAllCartsFromDb();
    };
    addProdToUserCart = async (req, res) => {
        let idProd = req.params.id_prod;
        let cartUser = req.params.cart_user;
        await this.service.addProdToCart(idProd,cartUser)
        res.redirect(`http://localhost:${PORT}/session/main`)
    };
}

module.exports = {
    CartController,
};
