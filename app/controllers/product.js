const { httpError } = require("../helpers/handleError");

const { ServiceProducts } = require("../services/products");

class ControllerProducts {
    constructor() {
        this.service = new ServiceProducts();
    }

    getNewProductPage = async (req, res) => {
        try {
            let { username } = req.user;
            let allProducts = await this.service.getAllProductsFromDb();
            res.render("addNewProducts", { username, allProducts });
        } catch (error) {
            httpError(res, error);
        }
    };

    getAll = async (req, res) => {
        let products = await this.service.getAll();
        res.send(products);
    };

    getAllProducts = async (req, res) => {
        try {
            let { username } = req.user;
            let allProducts = await this.service.getAllProductsFromDb();
            res.render("products", { allProducts, username });
        } catch (error) {
            httpError(res, error);
        }
    };

    getAllNotebooks = async (req, res) => {
        try {
            let { username } = req.user;
            let allNotebooks = await this.service.getOnlyNotebooks();
            res.render(`notebooks`, { allNotebooks, username });
        } catch (error) {
            httpError(res, error);
        }
    };

    getAllComputers = async (req, res) => {
        try {
            let { username } = req.user;
            let allComputers = await this.service.GetOnlyComputers();
            res.render(`computers`, { allComputers, username });
        } catch (error) {
            httpError(res, error);
        }
    };

    getOneProduct = async (req, res) => {
        let { username } = req.user;
        try {
            let id = req.params.id_prod;
            let productFound = await this.service.getOneProductFromDb(id);
            res.render("productFoundById", {
                productFound,
                username,
            });
        } catch {
            res.render("productFoundById", {
                productFound,
                username,
            });
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
            await this.service.productUpdated(id, newData);
            res.redirect("/products");
        } catch (error) {
            httpError(res, error);
        }
    };

    deleteOneProduct = async (req, res) => {
        try {
            let id = req.params.id_prod;
            let result = await this.service.deleteOneFromDatabase(id);
            res.redirect('/products/addNewProduct')
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
}

module.exports = {
    ControllerProducts,
};
