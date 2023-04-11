const express = require('express');
const tagRoutes = require('../routes/tag');
const categoryRoutes = require('../routes/category');
const productRoutes = require('../routes/product');
const router = express.Router();

router.use('/tag', tagRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

module.exports = router;