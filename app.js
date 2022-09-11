require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { PORT } = process.env;
const { dbConnect } = require("./config/mongo");
const routerProd = require("./app/routes/products");
const routerUsers = require("./app/routes/users");
const routerLogin = require("./app/routes/login");
const routerRegister = require("./app/routes/register");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/products", routerProd);
app.use("/users", routerUsers);
app.use("/login", routerLogin);
app.use("/register", routerRegister);

app.set("views", "./public/ejs_views/");
app.set("view engine", "ejs");

dbConnect();
app.listen(PORT, () => {
  console.log(`
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

      Running in: http://localhost:${PORT}      

  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  `);   
});
