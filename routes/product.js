const express = require('express');
const productController = require('../controllers/productController')
const { getFileName } = require('../middleware/uploadFile');
const multer  = require('multer');
const mime = require('mime');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
    }
})
const upload = multer({ storage })

router.post('/', upload.single('image'), getFileName, productController.create);

module.exports = router;