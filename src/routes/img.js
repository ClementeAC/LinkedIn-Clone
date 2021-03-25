const { Router } = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const router = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public'),
    filename:  (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const uploadImage = multer({
    storage,
}).array('note-image', 6);

router.post('/images', (req, res) => {
    console.log("llego");
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.files);
        res.send(req.files);
    });
});

router.get('/images', (req, res) => {
    console.log("llego");
    res.send('<h1>hola</h1>');
});

router.get('/images/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/' + req.params.id));
});

module.exports = router;