const express = require('express');
const productController = require('../controllers/productController')
const productMiddleware = require('../middleware/productMiddleware');
const router = express.Router();


router.get('/:pid',productMiddleware.validateById, productController.byId)
router.get('/', productController.all);
router.post('/', productController.create);
router.patch('/:pid', productMiddleware.validateById, productController.update);
router.delete('/:pid', productMiddleware.validateById, productController.destroy);


module.exports = router;