const { httpError } = require("../helpers/handleError");
const { containerUsers } = require("../main");
const { v4: uuid } = require("uuid");

const getAllUsers = async (req, res) => {
    try {
        const listAll = await containerUsers.getAll();
        res.send(listAll);
    } catch (error) {
        httpError(res, error);
    }
};

const getOneUser = async (req, res) => {
    try {
        let id = req.params.id_user;
        const userFound = await containerUsers.getById(id);
        res.send(userFound);
    } catch (error) {
        httpError(res, error);
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password, address, age, phone } = req.body;
        const newUser = {
            id:uuid(),
            username,
            email,
            password,
            address,
            age,
            phone,
        };
        await containerUsers.save(newUser);
        console.log(`Added succesfully ${newUser.username} with id: ${newUser.id}`);
        res.send({
            data: newUser,
        });
    } catch (error) {
        httpError(res, error);
    }
};

const updateUser = (req, res) => {};

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id_user;
        id === undefined ? false : id;
        if (!id) {
            await containerUsers.deleteAll();
            res.status(200).send(`Succesfully Deleted All
    <a href="http://localhost:8080/users">GO TO MAIN PAGE</a>
    `);
        } else {
            await containerUsers.deleteById(id);
            res.status(200).send(`Succesfully One User
  <a href="http://localhost:8080/users">GO TO MAIN PAGE</a>
  `);
        }
    } catch (error) {
        httpError(res, error);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
};
