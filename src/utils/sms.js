require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sms = async (phone, code) => {

    client.messages.create({
        to: phone,
        from: process.env.MY_PHONE,
        body: 'Mensaje: Tu codigo de verificacion es: ' + code
    }).then(message=>{
        console.log(message.sid);
    }).catch(error=>{
        console.log(error);
    });

}

module.exports = {
    sms
};