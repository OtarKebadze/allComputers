const express = require("express");
const routerUsers = express.Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users')

routerUsers.get('/',getAllUsers)

routerUsers.get('/:id_user',getOneUser)

routerUsers.post('/',createUser)

routerUsers.put('/:id_user',updateUser)

routerUsers.delete('/:id_user?',deleteUser)


module.exports = routerUsers;
