const pool = require('../utils/dbconnection');
const { mail } = require('../utils/mailer');
const { sms } = require('../utils/sms');
const query = require('../utils/queries');


const get = async (req, res) => { 
  const client = await pool.connect();
  try{
    const response = await client.query(query.get);
    res.status(200).json(response.rows);
  }catch{
    res.status(505);
  }finally{
    client.release(true);
  }
};

getProfiles
createProfile
updateProfile
deleteProfile
    
getDataProfile //
  getSkills
  getProjects
  getInterests
  getAchievements
  getWorkExperience
  getEducation
    
createDataProfile //
  createSkills
  createProjects
  createInterests
  createAchievements
  createWorkExperience
  createEducation

updateDataProfile //
  updateSkills
  updateProjects
  updateInterests
  updateAchievements
  updateWorkExperience
  updateEducation
 
deleteDataProfile //
  deleteSkills
  deleteProjects
  deleteInterests
  deleteAchievements
  deleteWorkExperience
  deleteEducation


module.exports = {

};
