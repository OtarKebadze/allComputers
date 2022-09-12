const express = require("express");
const routerUsers = express.Router();
const {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteOneUser,
    deleteAllUsers,
    registerNewUser,
    getRegisterPage,
    loginUser,
    getLoginPage,
    getFailRegisterPage,
    getFailLoginPage
} = require('../controllers/users')

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                  USERS                    //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerUsers.get('/',getAllUsers)

routerUsers.get('/:id_user',getOneUser)

routerUsers.put('/:id_user',updateUser)

routerUsers.delete('/:id_user',deleteOneUser)

routerUsers.delete('/deleteAll/delete',deleteAllUsers)

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                 REGISTER                  //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerUsers.post('/register', registerNewUser)

routerUsers.get('/register', getRegisterPage)

routerUsers.get('/register_fail', getFailRegisterPage)


// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                  LOGIN                    //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerUsers.post('/login', loginUser)

routerUsers.get('/login', getLoginPage)

routerUsers.get('/login_fail', getFailLoginPage)

module.exports = routerUsers;
