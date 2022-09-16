// const mongoose = require("mongoose");
// const ContainerMongoose = require("../persistance/mongo");
// const collection = "products";

// const productSchema =new mongoose.Schema({
//     id: {type: String, unique : true ,required: true},
//     title:{type: String, unique : true ,required: true},
//     thumbnail:{type: String, required: true},
//     price:{type: Number, required: true},
//     description: {type: String, required: true},
//     category: {type: String, required: true},
// },{
//     timestamps:true,
//     __v:false
// })

// const model = mongoose.model(collection, productSchema)

// class MongooseProducts extends ContainerMongoose{
//   constructor(){
//       super(model)
//   }
//   }


// module.exports= MongooseProducts;