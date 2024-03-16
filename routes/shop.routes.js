// routes boilerplate

const express = require('express');
const { createShopController, fetchUserShopsController, getShopDetails } = require('../controllers/shop.controllers');
const router = express.Router();


router.post('/create',createShopController);
router.post('/fetch_user_shops',fetchUserShopsController)
router.post('/details',getShopDetails)

module.exports = router;