const { httpError } = require("../helpers/handleError");
const {
    getAllProductsFromDb,
    createNewProduct,
    deleteOneFromDatabase,
    getOneProductFromDb,
    deleteAllProductsFromDatabase,
} = require("../services/products");

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await getAllProductsFromDb();
        console.log(allProducts);
        res.render("products", { allProducts });
    } catch (error) {
        httpError(res, error);
    }
};

const getOneProduct = async (req, res) => {
    try {
        let id = req.params.id_prod;
        let result = await getOneProductFromDb(id);
        res.send(result);
    } catch (error) {
        httpError(res, error);
    }
};

const saveProductInDatabase = async (req, res) => {
    try {
        const data = req.body;
        let response = await createNewProduct(data);
        res.redirect("http://localhost:8080/products");
    } catch (error) {
        httpError(res, error);
    }
};

const updateProduct = (req, res) => {
    try {
    } catch (error) {
        httpError(res, error);
    }
};

const deleteOneProduct = async (req, res) => {
    try {
        let id = req.params.id_prod;
        let result = await deleteOneFromDatabase(id);
        res.send(result);
    } catch (error) {
        httpError(res, error);
    }
};

const deleteAllProducts = async (req, res) => {
    try {
        let result = await deleteAllProductsFromDatabase();
        res.send(result);
    } catch (error) {
        httpError(res, error);
    }
};

module.exports = {
    getAllProducts,
    getOneProduct,
    saveProductInDatabase,
    updateProduct,
    deleteOneProduct,
    deleteAllProducts,
};
