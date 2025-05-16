const multer = require('multer');
const path = require("node:path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '..', 'public', 'books');
        fs.mkdirSync(dir, { recursive: true });  // Создаёт папку, если её нет
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, uniqueSuffix + '-' + originalName);
    }
});

module.exports = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single('fileBook');
