const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const orderDto = new mongoose.Schema(
    {
        numberOfOrder: { type: String, required: true },
        products: Array,
        date: { type: Date, required: true },
        state: {type:String , required:true},
        email: {type:String, required:true}
    },
    {
        timestamps: true,
        __v: false,
    }
);



class DaoOrdersMongoose extends MongooseContainer {
    constructor() {
        super("orders", orderDto);
    }
    async save(obj) {
        let col = await this.schema.create(obj);
        await col.save();
    }
    async getAll() {
        return await this.schema.find({}).lean();
    }
    async deleteAll() {
        await this.schema.deleteMany({});
    }
}

module.exports = {
    DaoOrdersMongoose,
};