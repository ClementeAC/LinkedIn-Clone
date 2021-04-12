const pool = require('../utils/dbconnection');
const { mail } = require('../utils/mailer');
const query = require('../utils/queries');

const getPublication = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getPublication, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createpublication = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, date, descripcion, img, job_offer } = req.body;
    const response = await client.query(query.createpublication, [
      user_id, 
      date, 
      descripcion, 
      img, 
      job_offer
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updatepublication = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { date, descripcion, img } = req.body;

    const response = await client.query(query.updatepublication, [
        date, 
        descripcion, 
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

const deletepublication = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deletepublication, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};


    // Reacciones
const getReaction = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getReaction, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createReaction = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, date, publication, charmed, interesting, recommend, celebrate } = req.body;
    const response = await client.query(query.createReaction, [
      user_id, 
      date, 
      publication, 
      charmed, 
      interesting, 
      recommend, 
      celebrate
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateReaction = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { date, charmed, interesting, recommend, celebrate } = req.body;

    const response = await client.query(query.updateReaction, [
        date, 
        charmed, 
        interesting, 
        recommend, 
        celebrate,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteRaction = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteRaction, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

    // Comentarios
const getComment = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getComment, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createComment = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, date, publication, comment } = req.body;
    const response = await client.query(query.createComment, [
      user_id, 
      date, 
      publication, 
      comment
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateComment = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { date, comment } = req.body;

    const response = await client.query(query.updateComment, [
        date, 
        comment,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteComment = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteComment, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

module.exports = {
  getPublication,
  createpublication,
  updatepublication,
  deletepublication,

  getReaction,
  createReaction,
  updateReaction,
  deleteRaction,

  getComment,
  createComment,
  updateComment,
  deleteComment
};