const { v4: uuid } = require("uuid");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");
const logger = require("../helpers/log4js");


class ServiceProducts {
    constructor() {
        this.dao = new DaoProductMongoose();
    }
    getAll = async () => {
        return await this.dao.getAll();
    };
    getAllProductsFromDb = async () => {
        let products = await this.dao.getAll();
        if (products === []) {
            return "";
        }
        return products;
    };

    getOnlyNotebooks = async () => {
        let allProds = await this.dao.getAll();
        let result = allProds.filter((prods) => prods.category == "NOTEBOOK");
        return result;
    };

    GetOnlyComputers = async () => {
        let allProds = await this.dao.getAll();
        let result = allProds.filter((prods) => prods.category == "COMPUTER");
        return result;
    };

    getOneProductFromDb = async (id) => {
        let productInDb = await this.dao.getById(id);
        if (productInDb.length === 0 || !productInDb) {
            return false
        }
        return productInDb;
    };

    createNewProduct = async (data) => {
        const { title, thumbnail, price, description, category } = data;
        let newProduct = {
            id: uuid(),
            title,
            thumbnail,
            price,
            qty:0,
            description,
            category,
        };
        await this.dao.save(newProduct);
        logger.info(
            `Added succesfully ${newProduct.title} with id: ${newProduct.id}`
        );
    };

    productUpdated = async (id, newData) => {
        await this.dao.deleteById(id);
        const newProduct = {
            id: uuid(),
            title: newData.title,
            thumbnail: newData.thumbnail,
            price: newData.price,
            description: newData.description,
            category: newData.category,
        };
        await this.dao.save(newProduct);
        logger.info(`PRODUCT UPDATED WITH ID : ${newProduct.id} `);
    };

    deleteOneFromDatabase = async (id) => {
        let productInDb = await this.dao.getById(id);
        if (productInDb.length === 0 || !productInDb) {
            logger.error("UNEXISTENT PRODUCT ID");
            return { error: "UNEXISTENT PRODUCT ID" };
        }
        await this.dao.deleteById(id);
        logger.info(`Succesfully deleted One Product with id: ${id}
    <a href="/products">GO TO MAIN PAGE</a>`);
    };

    deleteAllProductsFromDatabase = async () => {
        await this.dao.deleteAll();
        logger.info(`SUCESSFULLY DELETED ALL PRODUCTS FROM DATABASE
        <a href="/products">GO TO MAIN PAGE</a>`);
    };
}

module.exports = {
    ServiceProducts,
};
