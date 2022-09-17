const { DaoCartMongoose } = require("../daos/daoCartMongoose");

class CartService {
    constructor() {
        this.dao = new DaoCartMongoose();
    }
    get =  async () =>{
       let cart = await this.dao.getAll();
       return cart
    }
    del =  async () =>{
        await this.dao.deleteAll();
        
     }
}

module.exports = {
    CartService,
};
