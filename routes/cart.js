const express = require('express');
const cartController = require('../controllers/cartController');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportResponseJwtMiddleware');
const router = express.Router();


router.get('/', authorized, accessValidate('view', 'Cart'), cartController.index);
router.patch('/', authorized, accessValidate('update', 'Cart'), cartController.update);


module.exports = router;