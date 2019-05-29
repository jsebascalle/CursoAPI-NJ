var express = require('express');
var router = express.Router();

const PlacesController = require("../controllers/PlacesController");
const authenticateOwner = require('../middlewares/authenticateOwner');


/* GET users listing. */
router.route('/').get(PlacesController.index)
                 .post(PlacesController.multerMiddleware(),PlacesController.store,PlacesController.saveImage);

router.route('/:id').get(PlacesController.find,PlacesController.show)
                    .put(PlacesController.find,authenticateOwner,PlacesController.update)
                    .delete(PlacesController.find,authenticateOwner,PlacesController.destroy);

module.exports = router;
