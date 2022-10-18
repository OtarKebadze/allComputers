const nodemailer = require("nodemailer");
const { GMAIL, GMAIL_PASS } = process.env;

let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: GMAIL,
        pass: GMAIL_PASS,
    },
});

module.exports = {
    transporter,
};
