const { OrderService } = require("../services/order");

class OrderController {
    constructor() {
        this.service = new OrderService();
    }
    getAllOrders = async (req, res) => {
        const allOrders = await this.service.getAllOrders(); 
        res.send(allOrders);
    };

    deleteAllOrders = async (req,res) => {
        await this.service.deleteAllOrders()
        res.send('ALL ORDERS DELETED')
    }

    generateOrder = async (userCartFound) =>{
        const generatedOrder = await this.service.generateAndSaveOrder(userCartFound)
        return generatedOrder
    }
}

module.exports = {
    OrderController,
};
