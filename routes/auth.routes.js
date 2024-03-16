// routes boilerplate

const express = require('express');
const { registerUserController, loginUserController, verifyAuthController } = require('../controllers/auth.controllers');
const router = express.Router();


router.post('/register',registerUserController);
router.post('/login', loginUserController);
router.post('/verify', verifyAuthController);


module.exports = router;