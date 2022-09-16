const { httpError } = require("../helpers/handleError");

const { ServiceUsers } = require("../services/users");

class ProductController {
    constructor() {
        this.service = new ServiceUsers();
    }

    getAllUsers = async (req, res) => {
        try {
            const result = await this.service.getAllUsersFromDb();
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    getOneUser = async (req, res) => {
        try {
            let id = req.params.id_user;
            let result = await this.service.getOneUserFromDb(id);
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    saveNewUser = async (req, res) => {
        try {
            let data = req.body;
            await this.service.createAndSaveNewUSerInDb(data);
        } catch (error) {
            httpError(res, error);
        }
    };

    updateUser = (req, res) => {
        try {
        } catch (error) {
            httpError(res, error);
        }
    };

    deleteOneUser = async (req, res) => {
        try {
            let id = req.params.id_user;
            const result = await this.service.deleteOnUserFromDB(id);
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };

    deleteAllUsers = async (req, res) => {
        try {
            let result = await this.service.deleteAllUsersFromDB();
            res.send(result);
        } catch (error) {
            httpError(res, error);
        }
    };
}

module.exports = {
    ProductController,
};
