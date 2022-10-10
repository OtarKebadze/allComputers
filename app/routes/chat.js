const { Router } = require("express");
const { ChatController } = require("../controllers/chat");
const checkAuthenticated = require("../middlewares/auth");

class RouterChat {
    constructor() {
        this.controller = new ChatController();
    }
    config() {
        const routerChat = Router();

        routerChat.get("/" ,checkAuthenticated, this.controller.getChatPage)

        routerChat.get("/:email" ,checkAuthenticated, this.controller.getEmailMessages)

        return routerChat;
    }
}

module.exports = {
    RouterChat,
};
