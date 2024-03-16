// routes boilerplate

const express = require('express');
const { createProductsController } = require('../controllers/products.controller');
 const router = express.Router();


router.post('/create',createProductsController);

 


module.exports = router;