const { Router } = require('express');
const router = Router();

const { 
    getUsers, 
    getLogin,
    createUser, 
    updateUser, 
    deleteUser,
    createCode,
    deleteCode
} = require('../controllers/users.controllers');

router.get('/', getUsers);
router.post('/login', getLogin);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/code', createCode);
router.delete('/code/:id', deleteCode);

module.exports = router;