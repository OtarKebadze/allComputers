const { v4: uuid } = require("uuid");
const { DaoProductMongoose } = require("../daos/daosProductMongoose");
// const { DAO_TYPE: daoType } = require("../../config");
// const { ProductDaoFactory } = require("../factory/daoProductsFactory");

class ServiceProducts {
    constructor() {
        this.dao = new DaoProductMongoose()
    }

    getAllProductsFromDb = async () => {
        let products = await this.dao.getAll();
        if (products === []) {
            return "";
        }
        return products;
    };

    getOneProductFromDb = async (id) => {
        let productInDb = await this.dao.getById(id);
        if (productInDb.length === 0 || !productInDb) {
            console.error("UNEXISTENT ID");
            return { error: "UNEXISTENT ID" };
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
