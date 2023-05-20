const express = require('express');
const tagRoutes = require('../routes/tag');
const categoryRoutes = require('../routes/category');
const productRoutes = require('../routes/product');
const router = express.Router();
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');

router.use('/tag', tagRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

module.exports = router;