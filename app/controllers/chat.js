const { ChatService } = require("../services/chat");

class ChatController {
    constructor() {
        this.service = new ChatService();
    }
    getChatPage = async (req, res) => {
        const { username , isAdmin} = req.user;
        let type;
        if (isAdmin === true) {
            type = 'admin'
        }else{
            type = 'user'
        }
        res.render("messages", { username ,type});
    };
    getEmailMessages = async (req, res) => {
        const  paramMail  = req.params.email;
        const { username } = req.user;
        if (paramMail !== username){
        res.render('error_mail', { username } )
        }else{
        const messages = await this.service.getAllMessagesByEmail(paramMail);
        res.render("personalMessages", { messages , username});
        }
    };
}

module.exports = {
    ChatController,
};
