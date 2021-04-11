const { Router } = require('express'); 
const router = Router();

const {
    get
} = require('../controllers/lists.controllers');

router.get('/tags/:id', get);

module.exports = router;