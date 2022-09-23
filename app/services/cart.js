const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");

class CartService {
    constructor() {
        this.cartDao = new DaoCartMongoose();
        this.productDao = new DaoProductMongoose();
    }
    getAllCartsFromDb = async () => {
        let cart = await this.cartDao.getAll();
        return cart;
    };
    delAllCartsFromDb = async () => {
        await this.cartDao.deleteAll();
    };
    addProdToCart = async (idProd, cartUser) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === cartUser
        );
        let productFound = await this.productDao.getById(idProd);
        if (userCartFound[0].products.length === 0) {
            await userCartFound[0].products.push(productFound[0]);
            await this.cartDao.addProd(cartUser, productFound[0]);
        } else {
            let newUserCart = userCartFound[0].products;
            await newUserCart.push(productFound[0]);
            await this.cartDao.addProd(cartUser, newUserCart);
            console.log(newUserCart[0]);
        }
    };
}

module.exports = {
    CartService,
};
