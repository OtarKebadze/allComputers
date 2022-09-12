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

const SaveNewUSerInDb = async (user) => {
    await containerUsers.save(user);
    console.log(user)
    console.log(`Added succesfully ${user.username} with id: ${user.id}`);
    return user;
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

const deleteAllUsersFromDB = async ()=>{
    const listAll = await containerUsers.getAll();
    if (listAll.length === 0) {
        return {error :" NOT USERS IN SYSTEM "}
    }
    await containerUsers.deleteAll()
    return 'DELETED ALL USERS FROM SYSTEM'
}
module.exports = {
    SaveNewUSerInDb,
    getAllUsersFromDb,
    getOneUserFromDb,
    deleteOnUserFromDB,
    deleteAllUsersFromDB
};
