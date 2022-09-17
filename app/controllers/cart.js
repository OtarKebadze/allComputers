const { CartService } = require("../services/cart");

class CartController {
    constructor() {
        this.service = new CartService();
    }

    test = (req,res)=>{
       res.send(this.service.test())
    }
    get = async (req,res)=>{
        let cart =  await this.service.get()
        console.log(cart)
    }

    del = async (req,res)=>{
        let cart =  await this.service.del()
        
    }
}

module.exports = {
    CartController,
};
