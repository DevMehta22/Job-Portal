const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"Uploads/")
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage,
    limits: {fileSize: '10000000'},
    fileFilter: (req,file,cb) => {
        const fileTypes = /pdf|docx|png|jpg|jpeg/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

        if (mimeType && extname) {
            return cb(null,true)
        }
        cb("give proper file")
    }
}).single('image')

module.exports = {upload} 