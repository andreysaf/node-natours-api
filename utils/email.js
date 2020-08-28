const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    console.log('Transporter created');

    transporter.verify(function(error, success) {
        if (error) {
             console.log(error);
        } else {
             console.log('Server is ready to take our messages');
        }
     });

    // define the email options
    const mailOptions = {
        from: 'Andrey Safonov <a.so777@live.ca>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    console.log('Mail options created');

    // actually send the email
    await transporter.sendMail(mailOptions);
    
    console.log('email sent');
};

module.exports = sendEmail;