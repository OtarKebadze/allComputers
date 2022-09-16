const { PORT } = require("../../config");
const { httpError } = require("../helpers/handleError");
const {
    ServiceProducts
} = require("../services/products")


class ControllerProducts {
    constructor(){
        this.service = new ServiceProducts();
    }

    getAllProducts = async (req, res) => {
        try {
            let allProducts = await this.service.getAllProductsFromDb();
            console.log(allProducts);
            res.render("products", { allProducts });
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
            res.redirect(`http://localhost:${PORT}/products`);
        } catch (error) {
            httpError(res, error);
        }
    };

    updateProduct = (req, res) => {
        try {
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
    ControllerProducts
};
