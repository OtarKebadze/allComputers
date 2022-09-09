const { httpError } = require("../helpers/handleError");
const { containerUsers } = require("../main");


const getAllUsers = async (req, res) => {
  try {
    const listAll = await containerUsers.getAll()
    res.send({ data: listAll });
  } catch (error) {
    httpError(res, err);
  }
};

const getOneUser = (req, res) => {};

const createUser = async (req, res) => {
  try {
    const { username, email, password, address, age, phone } = req.body;
    const newUser = {
      username,
      email,
      password,
      address,
      age,
      phone,
    };
    await containerUsers.save(newUser)
    res.send({
      data: newUser,
    });
  } catch (error) {
    httpError(res, err);
  }
};

const deleteUser = (req, res) => {};

//TODO: no olvidar hacer deleteAll

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
