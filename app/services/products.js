const { v4: uuid } = require("uuid");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");
// const { DAO_TYPE: daoType } = require("../../config");
// const { ProductDaoFactory } = require("../factory/daoProductsFactory");

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
            description,
            category,
        };
        await this.dao.save(newProduct);
        console.log(
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
        console.log(`PRODUCT UPDATED WITH ID : ${newProduct.id} `);
    };

    deleteOneFromDatabase = async (id) => {
        let productInDb = await this.dao.getById(id);
        if (productInDb.length === 0 || !productInDb) {
            console.error("UNEXISTENT PRODUCT ID");
            return { error: "UNEXISTENT PRODUCT ID" };
        }
        await this.dao.deleteById(id);
        console.log(`Succesfully deleted One Product with id: ${id}
    <a href="/products">GO TO MAIN PAGE</a>`);
    };

    deleteAllProductsFromDatabase = async () => {
        await this.dao.deleteAll();
        console.log(`SUCESSFULLY DELETED ALL PRODUCTS FROM DATABASE
        <a href="/products">GO TO MAIN PAGE</a>`);
    };
}

module.exports = {
    ServiceProducts,
};
