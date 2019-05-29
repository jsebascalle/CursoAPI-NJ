const express = require('express');
const router = express.Router();

const UsersController = require("../controllers/UsersController");
const AuthController = require("../controllers/AuthController");

/* GET users listing. */
router.get('/places',UsersController.myPlaces)

router.route('/').post(UsersController.store,AuthController.generateToken,AuthController.sendToken);

router.route('/:id').get(UsersController.find,UsersController.show)
                    .put(UsersController.find,UsersController.update)
                    .delete(UsersController.find,UsersController.destroy);

module.exports = router;
