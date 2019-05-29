const express = require("express");

var authRouter = require('./auth');
var indexRouter = require('./index');
var usersRouter = require('./users');
var placesRouter = require('./places');
var favoritesRouter = require('./favorites');
var visitsRouter = require('./visits');
var visitsPlacesRouter = require('./visitsPlaces');
var applicationsRouter = require('./applications');

let router = express.Router();

//router.use(authRoutes);
router.use(indexRouter);
router.use('/auth',authRouter);
router.use('/users',usersRouter);
router.use('/places',placesRouter);
router.use('/favorites',favoritesRouter);
router.use('/visits',visitsRouter);
router.use('/places',visitsPlacesRouter);
router.use('/applications',applicationsRouter);

module.exports = router;
