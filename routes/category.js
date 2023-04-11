const express = require('express');
const categoryController = require('../controllers/categoryController')
const categoryMiddleware = require('../middleware/categoryMiddleware');

const router = express.Router();


router.get('/:pid',categoryMiddleware.validateById, categoryController.byId)
router.get('/', categoryController.all);
router.post('/', categoryController.create);
router.patch('/:pid', categoryMiddleware.validateById, categoryController.update);
router.delete('/:pid', categoryMiddleware.validateById, categoryController.destroy);


module.exports = router;