const { httpError } = require("../helpers/handleError");


const {
    createAndSaveNewUSerInDb,
    getAllUsersFromDb,
    getOneUserFromDb,
    deleteOnUserFromDB,
} = require("../services/users");

const getAllUsers = async (req, res) => {
    try {
        const result = await getAllUsersFromDb();
        res.send(result);
    } catch (error) {
        httpError(res, error);
    }
};

const getOneUser = async (req, res) => {
    try {
        let id = req.params.id_user;
        let result = await getOneUserFromDb(id);
        res.send(result);
    } catch (error) {
        httpError(res, error);
    }
};

const saveNewUser = async (req, res) => {
    try {
        let data = req.body;
        let newUser = await createAndSaveNewUSerInDb(data);
    } catch (error) {
        httpError(res, error);
    }
};

const updateUser = (req, res) => {};

const deleteOneUser = async (req, res) => {
    try {
        let id = req.params.id_user;
        const result = await deleteOnUserFromDB(id);
        res.send(result)
    } catch (error) {
        httpError(res, error);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
    } catch (error) {
        httpError(res, error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    saveNewUser,
    updateUser,
    deleteOneUser,
    deleteAllUsers,
};
