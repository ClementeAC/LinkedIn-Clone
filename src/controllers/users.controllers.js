const pool = require('../utils/dbconnection');
const { mail, invite } = require('../utils/mailer');
const { sms } = require('../utils/sms');
const query = require('../utils/queries');


const getUsers = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getUsers, [id]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const getLogin = async (req, res) => {
  const client = await pool.connect();
  try{
    const { username } = req.body;
    const response = await client.query(query.getLogin, [
      username
    ]);

    if(typeof response.rows[0] === 'undefined'){
      res.status(200).json([{
        status: 404,
        messageError: "User not fount"
      }]);
    } else{
      res.status(200).json(response.rows);
    }
    
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createUser = async (req, res) => {
  const client = await pool.connect();
  try{
    const { username, email, password, phone } = req.body;
    const response = await client.query(query.createUser, [
      username, 
      email,
      phone,
      password
    ]);
    res.status(200).json(response.rows);

    //send email of welcome
    await mail(username, email)
    .catch(res.json(error));
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateUser = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { username, password, img } = req.body;

    const response = await client.query(query.updateUser, [
        username,
        password,
        img,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createCode = async (req, res) => {
  const client = await pool.connect();
  try{
    const { phone } = req.body;
    //generate and send code de verification
    var code = parseInt(Math.random() * (999999 - 100000) + 100000);
    const response = await client.query(query.createCode, [
      code
    ]);
    res.status(200).json(response.rows);
    sms( phone, response.rows[0].verification_code );
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteCode = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteCode, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const inviteFriend = async (req, res) => {
  const { email, friendEmail, username } = req.body;
  //send email of invitation
  await invite(username, email, friendEmail).catch(res.json(error));
  res.status(200).json([{
    status: 200,
    message: "successful"
  }]);
};

module.exports = {
  getUsers,
  getLogin,
  createUser,
  updateUser,
  createCode,
  deleteCode,
  inviteFriend
};
