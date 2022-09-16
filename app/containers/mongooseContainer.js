const  mongoose  = require("mongoose");

class MongooseContainer {
    constructor(coll , schema){
        this.schema = mongoose.model(coll , schema)
    }
}

module.exports = {
    MongooseContainer
}