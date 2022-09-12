const { httpError } = require("../helpers/handleError");


const{
    getAllUsersFromDb,
    getOneUserFromDb,
    deleteOnUserFromDB,
    deleteAllUsersFromDB
}= require("../services/users");

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

const updateUser = (req, res) => {
    try {
        
    } catch (error) {
        httpError(res,error)
    }
};

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
    let result = await deleteAllUsersFromDB()
    res.send(result)
    } catch (error) {
        httpError(res, error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteOneUser,
    deleteAllUsers,
}  
