const mongoose = require("mongoose");
const ContainerMongoose = require("../persistance/mongo");
const collection = "users";

const userSchema = new mongoose.Schema(
  {
    id: {type: String, unique : true ,required: true},
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, unique : true ,required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const model = mongoose.model(collection, userSchema)

class MongooseUsers extends ContainerMongoose{
  constructor(){
      super(model)
  }
  }


module.exports= MongooseUsers;

