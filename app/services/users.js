const { DaoUserMongoose } = require("../daos/daoUserMongoose");

class ServiceUsers {
    constructor() {
        this.dao = new DaoUserMongoose();
    }
    getAllUsersFromDb = async () => {
        const listAll = await this.dao.getAll();
        return listAll;
    };

    getOneUserFromDb = async (id) => {
        const userFoundInDb = await this.dao.getById(id);
        if (!userFoundInDb || userFoundInDb.length === 0) {
            console.error("UNEXISTENT USER ID");
            return { error: "UNEXISTENT USER ID" };
        }
        return userFoundInDb;
    };

    SaveNewUSerInDb = async (user) => {
        await this.dao.save(user);
        console.log(`Added succesfully ${user.username} with id: ${user.id}`);
        return user;
    };

    deleteOnUserFromDB = async (id) => {
        let userFoundInDb = await this.dao.getById(id);
        if (!userFoundInDb || userFoundInDb.length === 0) {
            console.error("UNEXISTENT USER ID");
            return { error: "UNEXISTENT USER ID" };
        }
        await this.dao.deleteById(id);
        return `Succesfully One User
    <a href="http://localhost:${PORT}/users">GO TO MAIN PAGE</a>
    `;
    };

    deleteAllUsersFromDB = async () => {
        const listAll = await this.dao.getAll();
        if (listAll.length === 0) {
            return { error: " NOT USERS IN SYSTEM " };
        }
        await this.dao.deleteAll();
        return "DELETED ALL USERS FROM SYSTEM";
    };
}

module.exports = {
    ServiceUsers,
};
