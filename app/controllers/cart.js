const { CartService } = require("../services/cart");

class CartController {
    constructor() {
        this.service = new CartService();
    }

    getAllCarts = async (req, res) => {
        await this.service.getAllCartsFromDb();
    };

    delAllCarts = async (req, res) => {
        await this.service.delAllCartsFromDb();
    };
    addProdToUserCart = async (req, res) => {
        let idProd = req.params.id_prod;
        let cartUser = req.params.cart_user;
        await this.service.addProdToCart(idProd, cartUser);
        res.redirect(`/main`);
    };

    removeQty = async (req, res) => {
        let idProd = req.params.id_prod;
        let { username } = req.user;
        await this.service.removeProdQtyInCart(idProd, username);
        res.redirect(`/main`);
    };

    addQty = async (req, res) => {
        let idProd = req.params.id_prod;
        let { username } = req.user;
        await this.service.addProdQtyInCart(idProd, username);
        res.redirect(`/main`);
    };

    completePurchase = async (req, res) => {
        let { username } = req.user;
        await this.service.completePurchase(username);
        res.redirect(`/main`);
    };

    deleteFromCart = async (req,res) =>{
        const { id_prod , cart_user} = req.params
        await this.service.deleteProductFromCart(id_prod , cart_user)
        res.redirect('/main')
    }
    addOneProductById = async (req,res)=>{
        let idProd = req.params.id_prod;
        let cartUser = req.params.cart_user;
        let qty= req.body.qty
        await this.service.addOneProductByIdToCart(idProd , cartUser, qty)
        res.redirect('/main')
    }
}

module.exports = {
    CartController,
};
