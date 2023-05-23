const express = require('express');
const { accessValidate } = require('../middleware/accessRole');
const { authorized } = require('../middleware/passportResponseJwtMiddleware');
const router = express.Router();
const deliveryAddressCtrl = require('../controllers/deliveryAddressCtrl')

router.get('/:pid', authorized, accessValidate('view', 'DeliveryAddress'), deliveryAddressCtrl.byId)
router.get('/', authorized, accessValidate('view', 'DeliveryAddress'), deliveryAddressCtrl.all);
router.post('/', authorized, accessValidate('create', 'DeliveryAddress'), deliveryAddressCtrl.create);
router.patch('/:pid', authorized, accessValidate('update', 'DeliveryAddress'), deliveryAddressCtrl.update);
router.delete('/:pid', authorized, accessValidate('delete', 'DeliveryAddress'), deliveryAddressCtrl.destroy);

module.exports = router;