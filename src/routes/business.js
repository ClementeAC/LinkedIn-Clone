const { Router } = require('express');
const router = Router();

const {
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
} = require('../controllers/business.controllers');

router.get('/connects/:id', getconnects);
router.post('/connects', createconnect);
router.delete('/connects/:id', deleteconnect);

router.get('/company/:id', getCompany);
router.post('/company', createCompany);
router.put('/company/:id', updateCompany);
router.delete('/company/:id', deleteCompany);
  
router.get('/notification/:id', getNotifications);
router.post('/notification', createUserNotification);
router.delete('/notification/:id', deleteNotification);
  
module.exports = router;