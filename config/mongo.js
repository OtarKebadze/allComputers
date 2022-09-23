const mongoose = require("mongoose");
const { DB_URI: url } = process.env;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbConnect = async () => {
    await mongoose.connect(url, mongooseOptions, (error, res) => {
        if (!error) {
            console.log(`
      °°°°°°°°°°°°°°°°°°
     |                  |              
     |     CONNECTED    |
     |                  |                          
      °°°°°°°°°°°°°°°°°°
          `);
        } else {
            console.log(`
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
