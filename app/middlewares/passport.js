const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const { DaoUserMongoose } = require("../daos/daoUserMongoose");

const daoUsersMongoose = new DaoUserMongoose();


passport.use(
    "register",
    new LocalStrategy(
        { usernameField: "username", passReqToCallback: true },
        async (req, username, password, done) => {
            const users = await daoUsersMongoose.getAll();
            const userFound = users.find((us) => us.username == username);
            if (userFound) {
              return done(null, false, { message: "USERNAME ALREADY IN USE" });
            } else {
                const passHashed = bcrypt.hashSync(
                    password,
                    bcrypt.genSaltSync(10)
                );
                const newUser = {
                    id: uuid(),
                    username,
                    email: req.body.email,
                    password: passHashed,
                    address: req.body.address,
                    age: req.body.age,
                    phone: req.body.phone,
                    //img: req.body.img,
                };
                await daoUsersMongoose.save(newUser);
                return done(null, newUser);
            }
        }
    )
);

passport.use(
    "autenticate",
    new LocalStrategy(async (username, password, done) => {
        const users = await daoUsersMongoose.getAll();
        const userFound = users.find((us) => us.username == username);
        if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
          return done(null, false, { message: "USERNAME OR PASSWORD NOT FOUND" });
        } else {
            return done(null, userFound);
        }
    })
);

passport.serializeUser((newUser, done) => {
    done(null, newUser.username);
});

passport.deserializeUser(async (username, done) => {
    const users = await daoUsersMongoose.getAll();
    const user = users.find((us) => us.username == username);
    return done(null, user);
});

module.exports = passport;
