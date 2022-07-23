const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require('../s3');

router.post('/addimages', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        const result = await uploadFile(file)
        res.send("image uploaded ✅")
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;