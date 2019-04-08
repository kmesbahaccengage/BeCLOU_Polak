let nodemailer = require('nodemailer');
let User = require('./user');
let mailer = {};

mailer.sendRegisterConfirmationLink = async function (user, hash) {
    let userClass = new User();
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dspproject18@gmail.com',
            pass: 'Bouboule18'
        }
    });
    let mailOptions = {
        from: 'dspproject18@gmail.com',
        to: user.email,
        subject: 'Account confirmation',
        text: "http://localhost:3000/confirmUser/" + await userClass.getUserId(user.email) + "?hash=" + hash
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = mailer;