const mongoose = require("mongoose");
const { DB_URI: url } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const dbConnect = () => {
  mongoose.connect(url,
     options,
     (err, res) => {
      if(!err){
          console.log('**** CONNECTED ****')
      } else {
          console.log('**** FAILED CONECCTION ****')
      }
  })
}
module.exports = { dbConnect };
