const express = require('express');
const orderController = require('../controllers/orderController');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportResponseJwtMiddleware');
const router = express.Router();


router.post('/', authorized, accessValidate('create', 'Order'), orderController.create);
router.get('/', authorized, accessValidate('view', 'Order'), orderController.index);


module.exports = router;