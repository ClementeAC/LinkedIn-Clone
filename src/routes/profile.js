const { Router } = require('express'); 
const router = Router();

const {
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
} = require('../controllers/profile.controllers');

router.get('/:id', getProfiles);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

router.get('/dataProfile/:id', getDataProfile);

router.post('/skills', createSkills);
router.post('/projects', createProjects);
router.post('/interests', createInterests);
router.post('/achievements', createAchievements);
router.post('/experience', createWorkExperience);
router.post('/education', createEducation);

router.put('/skills/:id', updateSkills);
router.put('/projects/:id', updateProjects);
router.put('/interests/:id', updateInterests);
router.put('/achievements/:id', updateAchievements);
router.put('/experience/:id', updateWorkExperience);
router.put('/education/:id', updateEducation);

router.delete('/skills/:id', deleteSkills);
router.delete('/projects/:id', deleteProjects);
router.delete('/interests/:id', deleteInterests);
router.delete('/achievements/:id', deleteAchievements);
router.delete('/experience/:id', deleteWorkExperience);
router.delete('/education/:id', deleteEducation);

module.exports = router;