const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../s3');

router.post('/addimages', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        console.log("file : ",file)
        const result = await uploadFile(file)
        console.log("result : ",result)
        res.send(result)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.get('/getimage/:key', async (req, res) => {
    try{
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);

    return readStream;
} catch (err) {
    res.status(400).json({ message: err.message })
}
})

module.exports = router;