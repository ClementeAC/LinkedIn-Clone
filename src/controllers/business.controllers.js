const pool = require('../utils/dbconnection');
const { mail } = require('../utils/mailer');
const query = require('../utils/queries');

//connects
const getconnects = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getconnects, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createconnect = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, connect } = req.body;
    const response = await client.query(query.createconnect, [
      user_id, 
      connect
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteconnect = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteconnect, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

//company
const getCompany = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getCompany, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createCompany = async (req, res) => {
  const client = await pool.connect();
  try{
    const { name, location, user_id } = req.body;
    const response = await client.query(query.createCompany, [
      name, 
      location, 
      user_id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateCompany = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { name, location } = req.body;

    const response = await client.query(query.updateCompany, [
        name, 
        location,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteCompany = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteCompany, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

//notification
const getNotifications = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getNotifications, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createUserNotification = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, date, title, value, connect, type } = req.body;
    const response = await client.query(query.createUserNotification, [
      user_id, 
      date, 
      title, 
      value, 
      connect, 
      type
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteNotification = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteNotification, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

module.exports = {
  getconnects,
  createconnect,
  deleteconnect,

  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,

  getNotifications,
  createUserNotification,
  deleteNotification,
};
