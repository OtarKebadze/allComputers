const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");
const { OrderController } = require("../controllers/orders");
const { transporter } = require("../../config/transportNodemailer");
const logger = require("../helpers/log4js");
const { GMAIL } = process.env;
class CartService {
    constructor() {
        this.cartDao = new DaoCartMongoose();
        this.productDao = new DaoProductMongoose();
        this.orderController = new OrderController();
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
        let cartProducts = userCartFound[0].products;
        let condition = (element) => element.id === idProd;
        let productFoundInCart = cartProducts.some(condition);
        if (userCartFound[0].products.length === 0) {
            productFound[0].qty;
            productFound[0].qty = 1;
            await userCartFound[0].products.push(productFound[0]);
            await this.cartDao.addProd(cartUser, productFound[0]);
        } else if (productFoundInCart) {
            return;
        } else {
            productFound[0].qty = 1;
            let newUserCart = userCartFound[0].products;
            await newUserCart.push(productFound[0]);
            await this.cartDao.addProd(cartUser, newUserCart);
        }
    };

    getTotalPrice = async (username) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === username
        );
        let cartProducts = userCartFound[0].products;
        let totalPrice = cartProducts.reduce((acc, item) => {
            return acc + item.price * item.qty;
        }, 0);
        return totalPrice;
    };

    addProdQtyInCart = async (idProd, username) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === username
        );
        let cartProducts = userCartFound[0].products;
        let productInCartFound = cartProducts.find(
            (prod) => prod.id === idProd
        );
        productInCartFound.qty++;
        await this.cartDao.addProd(username, cartProducts);
    };

    removeProdQtyInCart = async (idProd, username) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === username
        );
        let cartProducts = userCartFound[0].products;
        let productInCartFound = cartProducts.find(
            (prod) => prod.id === idProd
        );
        if (productInCartFound.qty > 1) {
            productInCartFound.qty--;
            await this.cartDao.addProd(username, cartProducts);
        } else {
            logger.warn(`${productInCartFound.qty} IS MINIMUM QUANTITY`);
            return;
        }
    };

    completePurchase = async (username) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === username
        );
        let userOrder = await this.orderController.generateOrder(userCartFound);
        const cartId = userCartFound[0].id;
        const cartUser = userCartFound[0].userCart;
        await this.cartDao.deleteById(cartId);
        let emptyCart = await this.cartDao.createCart(cartUser);
        await this.cartDao.save(emptyCart);
        logger.info(`${cartUser} PURCHASE WAS A SUCCESS`);
        const hmtlContent = userOrder.products.reduce(function(a, item) {
            return a + '<p> ' + item.title + ' : '  + item.qty + ' unit/units' + '<p>'; 
          }, '');
        await transporter.sendMail({
            from: GMAIL,
            to: username,
            subject: "Your Order Was A Success",
            html: `
            <h1> ${userOrder.email} purchase info: </h1> 
            <P>Order Number : ${userOrder.numberOfOrder}</P>
            <P>Date : ${userOrder.date}</P>
            <p>PRODUCTS:</p>
            ${hmtlContent}
            `,
        });
    };

    deleteProductFromCart = async (id_prod, cart_user) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === cart_user
        );
        let products = userCartFound[0].products;
        let newProducts = products.filter((prod) => prod.id !== id_prod);
        products = newProducts;
        this.cartDao.update(cart_user, products);
    };

    addOneProductByIdToCart = async (idProd, cartUser, qty) => {
        let allCarts = await this.cartDao.getAll();
        let userCartFound = allCarts.filter(
            (cart) => cart.userCart === cartUser
        );
        let productFound = await this.productDao.getById(idProd);
        let cartProducts = userCartFound[0].products;
        let condition = (element) => element.id === idProd;
        let productFoundInCart = cartProducts.some(condition);
        if (qty <= 0 || qty === undefined || qty === null) {
            logger.warn('QUANTITY MUST BE HIGHER THAN 0')
            logger.error('PLEASE INTRODUCE QUANTITY AGAIN')
            return;
        } else if (userCartFound[0].products.length === 0) {
            productFound[0].qty = qty;
            await userCartFound[0].products.push(productFound[0]);
            await this.cartDao.addProd(cartUser, productFound[0]);
        } else if (productFoundInCart) {
            return;
        } else {
            productFound[0].qty = qty;
            let newUserCart = userCartFound[0].products;
            await newUserCart.push(productFound[0]);
            await this.cartDao.addProd(cartUser, newUserCart);
        }
    };
}

module.exports = {
    CartService,
};
