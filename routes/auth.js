const express = require('express');
const router = express.Router();

const AuthController = require("../controllers/AuthController");

/* GET users listing. */
router.route('/')
                 .post(AuthController.authenticate,AuthController.generateToken,AuthController.sendToken);


module.exports = router;
