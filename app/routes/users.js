const { Router } = require("express");

const {
    ProductController,
} = require("../controllers/users");

class RouterUsers {
    constructor() {
        this.controller = new ProductController();
    }
    config() {
        const routerUsers = Router();

        routerUsers.get("/", this.controller.getAllUsers);

        routerUsers.get("/:id_user", this.controller.getOneUser);

        routerUsers.put("/:id_user", this.controller.updateUser);

        routerUsers.delete("/:id_user", this.controller.deleteOneUser);

        routerUsers.delete("/deleteAll/delete", this.controller.deleteAllUsers);

        return routerUsers;
    }
}

module.exports = {
    RouterUsers,
};
