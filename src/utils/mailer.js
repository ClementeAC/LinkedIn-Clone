const nodemailer = require("nodemailer");
require('dotenv').config();

const mail = async (username, email) => {

  const transporter = nodemailer.createTransport({
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    secure: process.env.SECURE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    },
  });

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

module.exports = {
  mail
};