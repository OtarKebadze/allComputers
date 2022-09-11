// const MongooseCart = require("./containers/cart/daoCartMongoose");
const MongooseProducts = require("./models/product");
const MongooseUsers = require("./models/users");


// let containerCart=  new MongooseCart();
let containerProduct= new MongooseProducts();
let containerUsers = new MongooseUsers();



module.exports = {containerUsers ,containerProduct} ;