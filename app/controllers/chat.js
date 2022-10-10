const { DaoChatMongoose } = require("../daos/daoChatMongoose");
const { DaoUserMongoose } = require("../daos/daoUserMongoose");



class ChatController {
    constructor() {
        this.dao = new DaoChatMongoose();
        this.daoUsers = new DaoUserMongoose();
    }
    getChatPage = async (req,res)=>{
        let allUsers = await this.daoUsers.getAll();
        let userFound = allUsers.filter(
          (user) => user.username === req.user.username
        );
        const userMail = userFound[0].email
        res.render('messages', { userMail })
    }
    getEmailMessages = (req,res) => {
        console.log('hola')
    }
}

module.exports = {
    ChatController,
};
