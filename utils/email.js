const nodemailer = require("nodemailer");
require('dotenv').config()
let transporter;

exports.init = async () => {
    if (process.env.EMAIL_SENDER && process.env.EMAIL_PASSWORD) {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        console.log('EMAILS initiated with account ', process.env.EMAIL_SENDER);
    }
    else {
        console.log('EMAILS_SENDER not provided Email Initialization failed.',);
        transporter = null;
    }
}

exports.transporter = transporter;

// send mail with defined transport object


exports.sendMail = async (options) => {
    let info;
    try {
        info = await transporter.sendMail({
            from: process.env.EMAIL_SENDER, // sender address
            ...options
        });

        console.log('[^] EMAIL : sent: ', info.messageId);
        return info;
    }
    catch (err) {
        console.log('EMAIL ERROR ', err);
        throw err;
    }
}