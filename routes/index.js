const express = require('express'),
      router = express.Router(),
      multer = require('multer')
      convertapi = require('convertapi')('V52BoZij0Zo33vWy');

var storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'Uploads/')
},
filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.ppt')
}
})

var upload = multer({ storage: storage })


router.get('/', (req, res) => {
    res.render('../public/index')
})

router.get('/upload', (req, res) => {
    res.render('../public/upload')
})

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    convertapi.convert('jpg', {
        File: file.path
    }, 'pptx').then(function(result) {
        console.log(result.response.Files.length);
        
        result.saveFiles('public/assets/img');
    });

    res.send(file)
})


module.exports = router;