const express = require('express');
const { createPackage, getAllPackages, updatePackage, deletePackage } = require('../controllers/packageController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateUser, createPackage);
router.get('/', getAllPackages);
router.put('/:id', authenticateUser, updatePackage);
router.delete('/:id', authenticateUser, deletePackage);

module.exports = router;
