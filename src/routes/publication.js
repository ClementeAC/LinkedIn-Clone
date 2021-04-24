const { Router } = require('express');
const router = Router(); 

const {
    getPublication,
    getPublications,
    createpublication,
    updatepublication,
    deletepublication,

    createReaction,
    updateReaction,
    deleteRaction,

    createComment,
    updateComment,
    deleteComment
} = require('../controllers/publication.controllers');

router.get('/', getPublications);
router.get('/:id', getPublication);
router.post('/', createpublication);
router.put('/:id', updatepublication);
router.delete('/:id', deletepublication);

router.post('/reaction', createReaction);
router.put('/reaction/:id', updateReaction);
router.delete('/reaction/:id', deleteRaction);

router.post('/comment', createComment);
router.put('/comment/:id', updateComment);
router.delete('/comment/:id', deleteComment);

module.exports = router;