const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getUsers);
router.put('/users/:id', adminController.updateUserPassword);

module.exports = router;

