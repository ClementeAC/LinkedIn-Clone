const pool = require('../utils/dbconnection');
const query = require('../utils/queries');

const getProfiles = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.getProfiles, [ id ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createProfile = async (req, res) => {
  const client = await pool.connect();
  try{
    const { user_id, description, website, birthday, country, language, name, last_name } = req.body;
    const response = await client.query(query.createProfile, [
      user_id, 
      description, 
      website, 
      birthday, 
      country, 
      language, 
      name, 
      last_name
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateProfile = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { description, website, birthday, country, name, last_name } = req.body;

    const response = await client.query(query.updateProfile, [
        description, 
        website, 
        birthday, 
        country, 
        name, 
        last_name,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteProfile = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteProfile, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const getDataProfile = async (req, res) => { 
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response1 = await client.query(query.getSkills, [ id ]);
    const response2 = await client.query(query.getProjects, [ id ]);
    const response3 = await client.query(query.getInterests, [ id ]);
    const response4 = await client.query(query.getAchievements, [ id ]);
    const response5 = await client.query(query.getWorkExperience, [ id ]);
    const response6 = await client.query(query.getEducation, [ id ]);
  
    res.status(200).json(
      [
        response1.rows,
        response2.rows,
        response3.rows,
        response4.rows,
        response5.rows,
        response6.rows
      ]
    );
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};
    
const createSkills = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, value } = req.body;
    const response = await client.query(query.createSkills, [
      profile, 
      value
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createProjects = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, value, url } = req.body;
    const response = await client.query(query.createProjects, [
      profile, 
      value, 
      url
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createInterests = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, value } = req.body;
    const response = await client.query(query.createInterests, [
      profile, 
      value
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createAchievements = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, title, year, place } = req.body;
    const response = await client.query(query.createAchievements, [
      profile, 
      title, 
      year, 
      place
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createWorkExperience = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, title, year, place } = req.body;
    const response = await client.query(query.createWorkExperience, [
      profile, 
      title, 
      year, 
      place
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const createEducation = async (req, res) => {
  const client = await pool.connect();
  try{
    const { profile, title, year, place } = req.body;
    const response = await client.query(query.createEducation, [
      profile, 
      title, 
      year, 
      place
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateSkills = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { value } = req.body;
    const response = await client.query(query.updateSkills, [
        value,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateProjects = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { value, url } = req.body;
    const response = await client.query(query.updateProjects, [
        value,
        url,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateInterests = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { value } = req.body;
    const response = await client.query(query.updateInterests, [
        value,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateAchievements = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { title, year, place } = req.body;
    const response = await client.query(query.updateAchievements, [
        title, 
        year, 
        place,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateWorkExperience = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { title, year, place } = req.body;
    const response = await client.query(query.updateWorkExperience, [
        title, 
        year, 
        place,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const updateEducation = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const { title, year, place } = req.body;
    const response = await client.query(query.updateEducation, [
        title, 
        year, 
        place,
        id
    ]);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};
 
const deleteSkills = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteSkills, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteProjects = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteProjects, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteInterests = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteInterests, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteAchievements = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteAchievements, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteWorkExperience = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteWorkExperience, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

const deleteEducation = async (req, res) => {
  const client = await pool.connect();
  try{
    const id = parseInt(req.params.id);
    const response = await client.query(query.deleteEducation, [ id ]);
    res.status(200).json(response.rowCount);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

module.exports = {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  
  getDataProfile,
      
  createSkills,
  createProjects,
  createInterests,
  createAchievements,
  createWorkExperience,
  createEducation,

  updateSkills,
  updateProjects,
  updateInterests,
  updateAchievements,
  updateWorkExperience,
  updateEducation,
  
  deleteSkills,
  deleteProjects,
  deleteInterests,
  deleteAchievements,
  deleteWorkExperience,
  deleteEducation,
};