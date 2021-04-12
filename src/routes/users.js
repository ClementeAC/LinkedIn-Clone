const { Router } = require('express');
const router = Router();

const { 
    getUsers, 
    getLogin,
    createUser, 
    updateUser, 
    createCode,
    deleteCode,
    inviteFriend
} = require('../controllers/users.controllers');

router.get('/:id', getUsers);
router.post('/login', getLogin);
router.post('/', createUser);
router.put('/:id', updateUser);

router.post('/code', createCode);
router.delete('/code/:id', deleteCode);

router.post('/inviteFriend', inviteFriend);

module.exports = router;