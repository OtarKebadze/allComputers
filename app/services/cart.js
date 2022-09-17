const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");



class CartService {
    constructor() {
        this.cartDao = new DaoCartMongoose();
        this.productDao = new DaoProductMongoose();
    }
    get =  async () =>{
       let cart = await this.cartDao.getAll();
       return cart
    }
    del =  async () =>{
        await this.cartDao.deleteAll();
        
     }
     addProdToCart = async (idProd,cartUser) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(cart => cart.userCart === cartUser);
        let productFound = await this.productDao.getById(idProd);
        if (userCartFound[0].products.length === 0) {
            await userCartFound[0].products.push(productFound[0])
            await this.cartDao.addProd(cartUser,productFound[0])
        }else{
            console.log("2")
        }
        
     }
}

module.exports = {
    CartService,
};
