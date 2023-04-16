const express = require('express');
const productController = require('../controllers/productController')
const productMiddleware = require('../middleware/productMiddleware');
const { getFileName } = require('../middleware/uploadFile');
const multer = require('multer');
const mime = require('mime');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${mime.getExtension(file.mimetype)}`);
    }
})
const upload = multer({ storage })


router.get('/:pid',productMiddleware.validateById, productController.byId)
router.get('/', productController.all);
router.post('/', upload.single('image'), getFileName, productController.create);
router.patch('/:pid', productMiddleware.validateById, productController.update);
router.delete('/:pid', productMiddleware.validateById, productController.destroy);


module.exports = router;