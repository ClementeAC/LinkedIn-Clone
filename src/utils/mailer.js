const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.HOSTMAIL,
  port: process.env.PORTMAIL,
  secure: process.env.SECURE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});

const mail = async (username, email) => {
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"LinckendIn" <'+ process.env.EMAIL +'>', 
    to: email, 
    subject: "Hello "+ username +"!. Welcome to the LinkedIn clone! ✔",
    text: `Congratulations your registration in the LinkedIn clone was successful!
    Start and get an experience equal to that of the original linckedin platform where you can build your network of contacts and grow as a professional!    
    
    Developers: Clemente and Heberto`
  });
}

const invite = async (username, email, destinationEmail) => {
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"LinkedIn" <'+ process.env.EMAIL +'>', 
    to: destinationEmail, 
    subject: "Hello!. You have been invited to join the LinkedIn clone! ✔",
    text: `User ${username} with email ${email} has sent you an invitation to join the linkedIn clone community
    Start and get an experience equal to that of the original linckedin platform where you can build your network of contacts and grow as a professional!    
    
    Download the application at this link: https://github.com/ClementeAC/LinkedInClone-CC-HU/releases

    Developers: Clemente and Heberto`
  });
}

module.exports = {
  mail,
  invite
};