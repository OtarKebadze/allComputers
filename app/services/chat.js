const { DaoChatMongoose } = require("../daos/daoChatMongoose");



class ChatService {
    constructor() {
        this.dao = new DaoChatMongoose();   
    }

    getAllMessagesByEmail = async (paramMail) =>{
        const allMessages = await this.dao.getAll();
        const messagesByEmail = allMessages.filter(chat => chat.username === paramMail)
        return messagesByEmail
    }
}

module.exports = {
    ChatService,
};