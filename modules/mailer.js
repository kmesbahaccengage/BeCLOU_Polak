let nodemailer = require('nodemailer');
let mailer = {};

mailer.sendRegisterConfirmationLink = async function (email, hash) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dspproject18@gmail.com',
            pass: 'Bouboule18'
        }
    });
    let mailOptions = {
        from: 'dspproject18@gmail.com',
        to: email,
        subject: 'Account confirmation',
        text: "http://localhost:3000/api/confirmUser?hash=" + hash
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