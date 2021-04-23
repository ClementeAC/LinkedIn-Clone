const { Router } = require('express');
const router = Router(); 

const {
    getPublication,
    getPublications,
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
} = require('../controllers/publication.controllers');

router.get('/', getPublications);
router.get('/:id', getPublication);
router.post('/', createpublication);
router.put('/:id', updatepublication);
router.delete('/:id', deletepublication);

router.get('/reaction/:id', getReaction);
router.post('/reaction', createReaction);
router.put('/reaction/:id', updateReaction);
router.delete('/reaction/:id', deleteRaction);

router.get('/comment/:id', getComment);
router.post('/comment', createComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;