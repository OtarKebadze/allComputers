const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");


const schemaDTOCart = new mongoose.Schema({
    userCart: {type:String , required:true},
    products: Array
},{
    timestamps:true,
    __v:false
})


let instance = null;

class DaoCartMongoose extends MongooseContainer {
    constructor() {
        super("cart" , schemaDTOCart);
        this.model = mongoose.model("cart" , schemaDTOCart)
    }

    async createCart(user){
        const cart = new this.model()
        cart.userCart= user;
        return cart;
    }

    async addProd(userCart, prod){
    //logger.info (prod)
    await this.update(userCart,prod)
    }

    async save(obj) {
        let col = await this.schema.create(obj);
        await col.save();
    }
    async getById(id) {
        return await this.schema.find({ id: id }).lean();
    }
    async getAll() {
        return await this.schema.find({}).lean();
    }
    async deleteById(id) {
        await this.schema.deleteOne({ id: id });
    }
    async deleteAll() {
        await this.schema.deleteMany({});
    }
    async update(userCart, obj) {
        return await this.schema.updateOne(
            { userCart: userCart },
            { $set: { products: obj } }
        );
    }
    getInstance(){
        if (!instance) instance = new DaoCartMongoose()
        return instance
        }
}


module.exports = {
    DaoCartMongoose,
};