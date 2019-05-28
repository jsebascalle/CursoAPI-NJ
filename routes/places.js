var express = require('express');
var router = express.Router();

const PlacesController = require("../controllers/PlacesController");


/* GET users listing. */
router.route('/').get(PlacesController.index)
                 .post(PlacesController.store);

router.route('/:id').get(PlacesController.find,PlacesController.show)
                    .put(PlacesController.find,PlacesController.update)
                    .delete(PlacesController.find,PlacesController.destroy);

module.exports = router;
