const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const userDtochema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        name: { type: String, unique: true, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        password2: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: Number, unique: true, required: true },
        isAdmin: { type: Boolean, required: true },
    },
    {
        timestamps: true,
        __v: false,
    }
);

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
            { id: id },
            { $set: { products: obj } }
        );
    }
}

module.exports = {
    DaoUserMongoose,
};
