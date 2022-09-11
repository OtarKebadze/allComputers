const express = require("express");
const routerProd = express.Router();
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProducts,
} = require("../controllers/product");

routerProd.get("/", getAllProducts);

routerProd.get("/:id_prod", getOneProduct);

routerProd.post("/", createProduct);

routerProd.put("/:id_prod", updateProduct);

routerProd.delete("/:id_prod?", deleteProducts);



module.exports = routerProd;
