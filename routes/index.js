const express = require('express');
const tagRoutes = require('../routes/tag');
const categoryRoutes = require('../routes/category');
const productRoutes = require('../routes/product');
const router = express.Router();
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const deliveryAddressRoutes = require('../routes/deliveryAddress');
const cartRoutes = require('../routes/cart');
const orderRoutes = require('../routes/order');
const invoiceRoutes = require('../routes/invoice');

router.use('/tag', tagRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/delivery-addresses', deliveryAddressRoutes)
router.use('/cart', cartRoutes)
router.use('/order', orderRoutes)
router.use('/invoice', invoiceRoutes)

module.exports = router;