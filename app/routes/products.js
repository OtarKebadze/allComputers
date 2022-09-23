const { Router } = require("express");

const {
ControllerProducts
} = require("../controllers/product");
const checkAuthenticated = require("../middlewares/auth");

class RouterProducts {
    constructor() {
        this.controller = new ControllerProducts();
    }

    config() {
        const routerProd = Router();
        
        routerProd.get("/", this.controller.getAllProducts);

        routerProd.get("/:id_prod", this.controller.getOneProduct);

        routerProd.post("/", this.controller.saveProductInDatabase);

        // routerProd.put("/:id_prod", this.controller.updateProduct);

        routerProd.delete("/:id_prod", this.controller.deleteOneProduct);

        routerProd.delete("/deleteAll", this.controller.deleteAllProducts);

        return routerProd;
    }
}

module.exports = {
    RouterProducts,
};
