// const path = require("path");

// require("dotenv").config({
//     path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
// });
require("dotenv").config()
const express = require("express");
const app = express();
const passport = require("./app/middlewares/passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const coockieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const { PORT } = require("./config/index");
const { DB_URI: dburl, COOKIE_SECRET: secret } = process.env;

const { dbConnect, mongooseOptions } = require("./config/mongo");


const { RouterSession } = require("./app/routes/session");
const { RouterProducts } = require("./app/routes/products");
const { RouterUsers } = require("./app/routes/users");
const { RouterCart } = require("./app/routes/cart");
const routerProducts = new RouterProducts();
const routerUsers = new RouterUsers();
const routerSession = new RouterSession();
const routerCart = new RouterCart();

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//               MIDDLEWARES                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(coockieParser());

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                SESSION                    //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: dburl,
            mongoOptions: mongooseOptions,
        }),
        secret: secret,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 90000,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                ENDPOINTS                  //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.use("/products", routerProducts.config());
app.use("/users", routerUsers.config());
app.use("/session", routerSession.config());
app.use("/cart", routerCart.config());

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                   VIEWS                   //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.set("views", "./public/ejs_views/");
app.set("view engine", "ejs");

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                CONNECTION                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

dbConnect();
const server = app.listen(PORT, () => {
    console.log(`
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

      Running in PORT: :${PORT}      

  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  `);
});

server.on("error", (error) => {
    console.log(`ERROR IN SERVER : ${error.message}`);
});
