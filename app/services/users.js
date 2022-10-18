const { DaoUserMongoose } = require("../daos/daoUserMongoose");
const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const logger = require("../helpers/log4js");

class ServiceUsers {
    constructor() {
        this.dao = new DaoUserMongoose();
        this.cartDao = new DaoCartMongoose();
    }
    getAllUsersFromDb = async () => {
        const listAll = await this.dao.getAll();
        return listAll;
    };

    getOneUserFromDb = async (id) => {
        const userFoundInDb = await this.dao.getById(id);
        if (!userFoundInDb || userFoundInDb.length === 0) {
            logger.error("UNEXISTENT USER ID");
            return { error: "UNEXISTENT USER ID" };
        }
        return userFoundInDb;
    };

    SaveNewUSerInDb = async (user) => {
        await this.dao.save(user);
        logger.info(`Added succesfully ${user.username} with id: ${user.id}`);
        return user;
    };

    deleteOnUserFromDB = async (id) => {
        let userFoundInDb = await this.dao.getById(id);
        if (!userFoundInDb || userFoundInDb.length === 0) {
            logger.error("UNEXISTENT USER ID");
            return { error: "UNEXISTENT USER ID" };
        }
        await this.dao.deleteById(id);
        await this.cartDao.deleteById(id);
        return `Succesfully One User
    <a href="/users">GO TO MAIN PAGE</a>
    `;
    };

    deleteAllUsersFromDB = async () => {
        const listAll = await this.dao.getAll();
        if (listAll.length === 0) {
            return { error: " NOT USERS IN SYSTEM " };
        }
        await this.dao.deleteAll();
        await this.cartDao.deleteAll();
        return "DELETED ALL USERS FROM SYSTEM";
    };
}

module.exports = {
    ServiceUsers,
};
