const express = require("express");

var indexRouter = require('./index');
var usersRouter = require('./users');
var placesRouter = require('./places');
var authRouter = require('./auth');

let router = express.Router();

//router.use(authRoutes);
router.use(indexRouter);
router.use('/users',usersRouter);
router.use('/places',placesRouter);
router.use('/auth',authRouter);

module.exports = router;
