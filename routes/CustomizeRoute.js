const express = require("express");
const router = express.Router();
const { createCustomizePackage,getAllCustomPackages,updateCustomPackageStatus} = require('./../controller/customizeController');

// Routes for custom package requests
router.post('/create', createCustomizePackage);

// Route to get all custom packages
router.get('/getall', getAllCustomPackages);


router.put('/update-status/:id', updateCustomPackageStatus);



module.exports = router;
