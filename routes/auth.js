const express = require('express');
const router = express.Router();
const authConroller = require('../controllers/authController')

router.post('/login', authConroller.login)
router.get('/me', authConroller.me)

module.exports = router;