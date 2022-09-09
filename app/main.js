// const MongooseCart = require("./containers/cart/daoCartMongoose");
// const MongooseProducts = require("./containers/products/daoMongooseProducts");
const MongooseUsers = require("./models/users");


// let containerCart=  new MongooseCart();
// let containerProd= new MongooseProducts();
let containerUsers = new MongooseUsers();



module.exports = {containerUsers} ;