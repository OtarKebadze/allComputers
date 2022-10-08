const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const productDtoSchema = new mongoose.Schema(
    {
        id: { type: String, unique:true, required: true },
        title: { type: String, required: true },
        thumbnail: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
    },
    {
        timestamps: true,
        __v: false,
    }
);

let instance = null;

class DaoProductMongoose extends MongooseContainer {
    constructor() {
        super("products", productDtoSchema);
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
    async update(id, obj) {
        return await this.schema.updateOne(
            { id: id },
            { $set: { obj } }
        );
    }
    getInstance(){
        if (!instance) instance = new DaoProductMongoose()
        return instance
        }
}


module.exports = {
    DaoProductMongoose,
};
