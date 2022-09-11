const { containerProduct } = require("../main");
const { v4: uuid } = require("uuid");

const getAllProductsFromDb = async () => {
    let products = await containerProduct.getAll();
    if (products === []) {
        return "";
    }
    return products;
};

const getOneProductFromDb = async (id) => {
    let productInDb = await containerProduct.getById(id);
    if (productInDb.length === 0 || !productInDb) {
        console.error("UNEXISTENT ID");
        return { error: "UNEXISTENT ID" };
    }
    return productInDb;
};

const createNewProduct = async (data) => {
    const { title, thumbnail, price, description, category } = data;
    let newProduct = {
        id: uuid(),
        title,
        thumbnail,
        price,
        description,
        category,
    };
    await containerProduct.save(newProduct);
    console.log(
        `Added succesfully ${newProduct.title} with id: ${newProduct.id}`
    );
    console.log(newProduct);
};

const deleteOneFromDatabase = async (id) => {
    let productInDb = await containerProduct.getById(id);
    if (productInDb.length === 0 || !productInDb) {
        console.error("UNEXISTENT PRODUCT ID");
        return { error: "UNEXISTENT PRODUCT ID" };
    }
    await containerProduct.deleteById(id);
    console.log(`Succesfully deleted One Product with id: ${id}
<a href="http://localhost:8080/products">GO TO MAIN PAGE</a>`);
};

const deleteAllProductsFromDatabase = async () => {
    await containerProduct.deleteAll();
    console.log(`SUCESSFULLY DELETED ALL PRODUCTS FROM DATABASE
    <a href="http://localhost:8080/products">GO TO MAIN PAGE</a>`);
};
module.exports = {
    getAllProductsFromDb,
    getOneProductFromDb,
    createNewProduct,
    deleteOneFromDatabase,
    deleteAllProductsFromDatabase,
};
