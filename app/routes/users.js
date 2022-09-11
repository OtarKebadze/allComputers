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

routerUsers.get('/:id',getOneUser)

routerUsers.post('/',createUser)

routerUsers.put('/:id',updateUser)

routerUsers.delete('/:id',deleteUser)

//TODO: no olvidar hacer deleteAll

module.exports = routerUsers;
