const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const { v4: uuid } = require("uuid");

const schemaDTOCart = new mongoose.Schema(
    {
        id: { type: String, unique: true, required: true },
        userCart: { type: String, required: true },
        products: Array,
    },
    {
        timestamps: true,
        __v: false,
    }
);

class DaoCartMongoose extends MongooseContainer {
    constructor() {
        super("cart", schemaDTOCart);
        this.model = mongoose.model("cart", schemaDTOCart);
    }

    async addProd(userCart, prod) {
        await this.update(userCart, prod);
    }

    async save(obj) {
        let col = await this.schema.create(obj);
        await col.save();
    }

    async createCart(username) {
        const cart = new this.model();
        cart.id= uuid();
        cart.userCart = username;
        return cart;
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
}

module.exports = {
    DaoCartMongoose,
};
