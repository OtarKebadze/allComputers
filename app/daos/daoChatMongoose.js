const { MongooseContainer } = require("../containers/mongooseContainer");
const mongoose = require("mongoose");

const schemaDTOChat = new mongoose.Schema(
    {
        email: { type: String, required: true },
        type: { type: String, required: true },
        date: {type : Date},
        message:  { type: String }
    },
    {
        timestamps: true,
        __v: false,
    }
);

let instance = null;

class DaoChatMongoose extends MongooseContainer {
    constructor() {
        super("messages", schemaDTOChat);
    }
    async save(obj) {
        let col = await this.schema.create(obj);
        await col.save();
    }
    async getAll() {
        return await this.schema.find({}).lean();
    }
    getInstance() {
        if (!instance) instance = new DaoChatMongoose();
        return instance;
    }
}

module.exports = {
    DaoChatMongoose,
};
