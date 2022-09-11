const { httpError } = require("../helpers/handleError");
const { containerProduct } = require("../main");
const { v4: uuid } = require("uuid");

const getAllProducts = async (req, res) => {
  try {
    let allProds =
      (await containerProduct.getAll()) === []
        ? ""
        : await containerProduct.getAll();
    res.render("products", { allProds });
  } catch (error) {
    httpError(res, error);
  }
};

const getOneProduct = async (req, res) => {
  try {
    let id = req.params.id_prod;
    let product = await containerProduct.getById(id);
    console.log(product);
    res.send(product);
  } catch (error) {}
};

const createProduct = async (req, res) => {
  try {
    const { title, thumbnail, price, description, category } = req.body;
    let product = {
      id: uuid(),
      title,
      thumbnail,
      price,
      description,
      category,
    };
    await containerProduct.save(product);
    console.log(`Added succesfully ${product.title} with id: ${product.id}`);
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
    console.log(id);
    await containerProduct.deleteById(id);
    res.redirect("http://localhost:8080/products");
  } catch (error) {
    httpError(res, error);
  }
};

const deleteProducts = async (req, res) => {
  try {
    let id = req.params.id_prod;
    id === undefined ? false : id;
    if (!id) {
      await containerProduct.deleteAll();
      res.status(200).send(`Succesfully Deleted All
    <a href="http://localhost:8080/products">GO TO MAIN PAGE</a>
    `);
  }else{
  await containerProduct.deleteById(id);
  res.status(200).send(`Succesfully One Product
  <a href="http://localhost:8080/products">GO TO MAIN PAGE</a>
  `);
  }
  } catch (error) {
    httpError(res, error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProducts,
};
