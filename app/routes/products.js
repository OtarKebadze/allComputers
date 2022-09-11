const express = require("express");
const routerProd = express.Router();
const {
  getAllProducts,
  getOneProduct,
  saveProductInDatabase,
  updateProduct,
  deleteOneProduct,
  deleteAllProducts
} = require("../controllers/product");

routerProd.get("/", getAllProducts);

routerProd.get("/:id_prod", getOneProduct);

routerProd.post("/", saveProductInDatabase);

routerProd.put("/:id_prod", updateProduct);

routerProd.delete("/:id_prod", deleteOneProduct);

routerProd.delete("/deleteAll", deleteAllProducts);


module.exports = routerProd;
