require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = process.env;
const { dbConnect } = require("./config/mongo");

app.use(cors());
app.use(express.json());

app.use("/api", require("./app/routes/index"));

dbConnect();
app.listen(PORT, () => {
  console.log(`Running in : http://localhost:${PORT}`);
});
