const mongoose = require("mongoose");
const logger = require("../app/helpers/log4js");
const { DB_URI: url } = process.env;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbConnect = async () => {
    await mongoose.connect(url, mongooseOptions, (error, res) => {
        if (!error) {
            logger.info(`
      °°°°°°°°°°°°°°°°°°
     |                  |              
     |     CONNECTED    |
     |                  |                          
      °°°°°°°°°°°°°°°°°°
          `);
        } else {
            logger.error(`
          °°°°°°°°°°°°°°°°°°°°°°°°°
         |                        |         
         |    FAILED COONECTION   |  
         |                        |                     
          °°°°°°°°°°°°°°°°°°°°°°°°°
              `);
        }
    });
};
module.exports = { dbConnect , mongooseOptions};
