require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const coockieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./app/middlewares/passport");
const cors = require("cors");

const { 
  PORT, 
  DB_URI: dburl, 
  COOKIE_SECRET: secret 
} = process.env;

const { 
  dbConnect, 
  mongooseOptions 
} = require("./config/mongo");

const routerProd = require("./app/routes/products");
const routerUsers = require("./app/routes/users");

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//               MIDDLEWARES                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
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

app.use("/products", routerProd);
app.use("/users", routerUsers);


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                   VIEWS                   //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.set("views", "./public/ejs_views/");
app.set("view engine", "ejs");


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                CONNECTION                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

dbConnect();
app.listen(PORT, () => {
    console.log(`
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

      Running in: http://localhost:${PORT}      

  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  `);
});
