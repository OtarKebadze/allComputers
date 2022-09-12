const express = require("express");
const routerUsers = express.Router();
const {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteOneUser,
    deleteAllUsers,
} = require('../controllers/users')

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                  USERS                    //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerUsers.get('/',getAllUsers)

routerUsers.get('/:id_user',getOneUser)

routerUsers.put('/:id_user',updateUser)

routerUsers.delete('/:id_user',deleteOneUser)

routerUsers.delete('/deleteAll/delete',deleteAllUsers)


module.exports = routerUsers;
