const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});
require("dotenv").config();
const express = require("express");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
const passport = require("./app/middlewares/passport");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const coockieParser = require("cookie-parser");
const session = require("express-session");
const { PORT } = require("./config/index");
const { DB_URI: dburl, COOKIE_SECRET: secret, SESSION_EXPIRES } = process.env;
const { dbConnect, mongooseOptions } = require("./config/mongo");
const { RouterSession } = require("./app/routes/session");
const { RouterProducts } = require("./app/routes/products");
const { RouterUsers } = require("./app/routes/users");
const { RouterCart } = require("./app/routes/cart");
const { RouterChat } = require("./app/routes/chat");
const { DaoChatMongoose } = require("./app/daos/daoChatMongoose");
const { RouterOrder } = require("./app/routes/orders");
const logger = require("./app/helpers/log4js");
const routerProducts = new RouterProducts();
const routerUsers = new RouterUsers();
const routerSession = new RouterSession();
const routerCart = new RouterCart();
const routerChat = new RouterChat();
const routerOrder = new RouterOrder();
const daoChat = new DaoChatMongoose();

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
            maxAge: SESSION_EXPIRES,
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
app.use("/", routerSession.config());
app.use("/cart", routerCart.config());
app.use("/chat", routerChat.config());
app.use("/orders", routerOrder.config());

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                   VIEWS                   //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

app.set("views", "./public/ejs_views/");
app.set("view engine", "ejs");

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                 SOCKET IO                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

socketServer.on("connection", async (socket) => {
    logger.info("NUEVO USUARIO CONECTADO");
    let dataFromClassChat = await daoChat.getAll();
    socket.emit("messages", dataFromClassChat);
    socket.on("new_message", async (msg) => {
        await daoChat.save(msg);
        let dataFromClassChat = await daoChat.getAll();
        socketServer.sockets.emit("messages", dataFromClassChat);
    });
});

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                CONNECTION                 //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

dbConnect();
const server = httpServer.listen(PORT, () => {
    logger.info(`
  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

      Running in PORT: :${PORT}      

  °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
  `);
  logger.info(`CONNECTION TO PORT : ${PORT} WAS A SUCCESS`)
});

server.on("error", (error) => {
    logger.error(`ERROR IN SERVER : ${error.message}`);
});
