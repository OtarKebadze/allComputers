const express = require("express");
const routerUsers = express.Router();
const {
    getAllUsers,
    getOneUser,
    saveNewUser,
    updateUser,
    deleteOneUser,
    deleteAllUsers
} = require('../controllers/users')

routerUsers.get('/',getAllUsers)

routerUsers.get('/:id_user',getOneUser)

routerUsers.post('/',saveNewUser)

routerUsers.put('/:id_user',updateUser)

routerUsers.delete('/:id_user',deleteOneUser)

routerUsers.delete('/deleteAll',deleteAllUsers)

module.exports = routerUsers;
