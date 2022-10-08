const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { httpError } = require("../helpers/handleError");

const { ServiceProducts } = require("../services/products");

class ControllerProducts {
    constructor() {
        this.service = new ServiceProducts();
        this.cartDao = new DaoCartMongoose();
    }

    getAll = async (req, res) => {
        let products = await this.service.getAll();
        res.send(products);
    };
    getAllProducts = async (req, res) => {
        try {
            let allProducts = await this.service.getAllProductsFromDb();
            let cart = await this.cartDao.getAll();
            let cartFound = cart.filter(
                (user) => user.userCart === req.user.username
            );
            let userCart = cartFound[0].userCart;
            res.render("products", { allProducts, userCart });
        } catch (error) {
            httpError(res, error);
        }
    };

    getAllNotebooks = async (req, res) => {
        try {
            let allNotebooks = await this.service.getOnlyNotebooks();
            let cart = await this.cartDao.getAll();
            let cartFound = cart.filter(
                (user) => user.userCart === req.user.username
            );
            let userCart = cartFound[0].userCart;
            res.render(`notebooks`, { allNotebooks ,userCart});
        } catch (error) {
            httpError(res, error);
        }
    };

    getAllComputers = async (req, res) => {
        try {
            let cart = await this.cartDao.getAll();
            let cartFound = cart.filter(
                (user) => user.userCart === req.user.username
            );
            let userCart = cartFound[0].userCart;
            let allComputers = await this.service.GetOnlyComputers();
            res.render(`computers`, { allComputers ,userCart});
        } catch (error) {
            httpError(res, error);
        }
    };

    getOneProduct = async (req, res) => {
        try {
            let id = req.params.id_prod;
            let result = await this.service.getOneProductFromDb(id);
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    saveProductInDatabase = async (req, res) => {
        try {
            const data = req.body;
            await this.service.createNewProduct(data);
            res.status(200).redirect(`/products`);
        } catch (error) {
            httpError(res, error);
        }
    };

    updateProduct = async (req, res) => {
        try {
            const id = req.params.id_prod;
            const newData = req.body;
            await this.service.productUpdated(id,newData);
            res.redirect('/products')
        } catch (error) {
            httpError(res, error);
        }
    };

    deleteOneProduct = async (req, res) => {
        try {
            let id = req.params.id_prod;
            let result = await this.service.deleteOneFromDatabase(id);
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    deleteAllProducts = async (req, res) => {
        try {
            let result = await this.service.deleteAllProductsFromDatabase();
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    test = async (req, res) => {
        res.send(await this.service.test());
    };
}

module.exports = {
    ControllerProducts,
};
