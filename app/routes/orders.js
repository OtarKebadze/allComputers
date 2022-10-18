const { Router } = require("express");
const { OrderController }= require('../controllers/orders')

class RouterOrder {
    constructor() {
        this.controller = new OrderController();
    }
    config() {
        const routerOrder = Router();

        routerOrder.get("/", this.controller.getAllOrders)

        routerOrder.delete("/", this.controller.deleteAllOrders)

        return routerOrder;
    }
}

module.exports = {
    RouterOrder,
};
