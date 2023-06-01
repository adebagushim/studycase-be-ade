const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportResponseJwtMiddleware');
const router = express.Router();


router.get('/:order_id', authorized, accessValidate('view', 'Cart'), invoiceController.show);


module.exports = router;