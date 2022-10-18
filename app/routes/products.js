const { Router } = require("express");

const {
ControllerProducts
} = require("../controllers/product");
const { isAdmin } = require("../middlewares/admin");
const checkAuthenticated = require("../middlewares/auth");

class RouterProducts {
    constructor() {
        this.controller = new ControllerProducts();
    }

    config() {
        const routerProd = Router();
        
        routerProd.get("/", checkAuthenticated , this.controller.getAllProducts);

        routerProd.get("/addNewProduct",isAdmin, this.controller.getNewProductPage);

        routerProd.get("/prods", isAdmin, this.controller.getAll);

        routerProd.get("/notebooks", checkAuthenticated,this.controller.getAllNotebooks);

        routerProd.get("/computers",checkAuthenticated, this.controller.getAllComputers);

        routerProd.get("/:id_prod",checkAuthenticated, this.controller.getOneProduct);

        routerProd.post("/", isAdmin , this.controller.saveProductInDatabase);

        routerProd.patch("/:id_prod", this.controller.updateProduct);

        routerProd.delete("/:id_prod", this.controller.deleteOneProduct);
        
        routerProd.post("/delete/:id_prod", this.controller.deleteOneProduct);

        routerProd.delete("/deleteAll", this.controller.deleteAllProducts);

        return routerProd;
    }
}

module.exports = {
    RouterProducts,
};
