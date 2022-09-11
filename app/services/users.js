const { v4: uuid } = require("uuid");
const { containerUsers } = require("../main");

const getAllUsersFromDb = async () => {
    const listAll = await containerUsers.getAll();
    return listAll;
};

const getOneUserFromDb = async (id) => {
    const userFoundInDb = await containerUsers.getById(id);
    if (!userFoundInDb || userFoundInDb.length === 0 ) {
        console.error("UNEXISTENT USER ID");
        return { error: "UNEXISTENT USER ID" };
    }
    return userFoundInDb;
};

const createAndSaveNewUSerInDb = async (data) => {
    const { username, email, password, address, age, phone } = data;
    const newUser = {
        id: uuid(),
        username,
        email,
        password,
        address,
        age,
        phone,
    };
    await containerUsers.save(newUser);
    console.log(`Added succesfully ${newUser.username} with id: ${newUser.id}`);
    return newUser;
};

const deleteOnUserFromDB = async (id) => {
    let userFoundInDb = await containerUsers.getById(id);
    if (!userFoundInDb || userFoundInDb.length === 0) {
        console.error("UNEXISTENT USER ID");
        return { error: "UNEXISTENT USER ID" };
    }
    await containerUsers.deleteById(id);
    return (`Succesfully One User
    <a href="http://localhost:8080/users">GO TO MAIN PAGE</a>
    `);
};

module.exports = {
    createAndSaveNewUSerInDb,
    getAllUsersFromDb,
    getOneUserFromDb,
    deleteOnUserFromDB,
};
