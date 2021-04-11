const pool = require('../utils/dbconnection');
const { mail } = require('../utils/mailer');
const { sms } = require('../utils/sms');
const query = require('../utils/queries');


const getUsers = async (req, res) => { 
  const client = await pool.connect();
  try{
    const response = await client.query(query.getUsers);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

getconnects
createconnect
deleteconnect

//company
getCompany
createCompany
updateUser
deleteCompany

//notification
getNotifications
createUserNotification
deleteNotification


module.exports = {

};
