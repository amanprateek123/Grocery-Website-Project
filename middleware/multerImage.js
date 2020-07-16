const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + ' - ' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

module.exports = multer({
    storage: fileStorage,
    fileFilter: fileFilter
}); 