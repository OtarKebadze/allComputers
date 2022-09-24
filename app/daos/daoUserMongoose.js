const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const userDtochema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        address: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: Number, unique: true, required: true },
    },
    {
        timestamps: true,
        __v: false,
    }
);

let instance = null;

class DaoUserMongoose extends MongooseContainer {
    constructor() {
        super("users", userDtochema);
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
            { _id: id },
            { $set: { products: obj } }
        );
    }
    getInstance(){
        if (!instance) instance = new DaoUserMongoose()
        return instance
        }
}

module.exports = {
    DaoUserMongoose,
};
