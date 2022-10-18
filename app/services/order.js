const { DaoOrdersMongoose }= require('../daos/daoOrdersMongoose')



class OrderService {
    constructor() {
        this.dao = new DaoOrdersMongoose();   
    }

    getAllOrders = async ()=>{
     const allOrders = await this.dao.getAll()
     return allOrders
    }

    deleteAllOrders = async () => {
        await this.dao.deleteAll()
    }
   
    generateAndSaveOrder = async(userCartFound) =>{
        let allOrder = this.dao.getAll()
        let products = userCartFound[0].products
        const generatedOrder = {
            numberOfOrder:(await allOrder).length+1,
            products,
            state:'GENERATED',
            date: new Date(),
            email:userCartFound[0].userCart 
        }
        await this.dao.save(generatedOrder)
        return generatedOrder
    }
}

module.exports = {
    OrderService,
};