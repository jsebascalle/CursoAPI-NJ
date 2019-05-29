var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Application = require('../models/Application');
/* GET home page. */
router.get('/', function(req, res, next) {
  mongoose.connection.db.dropDatabase();
});

/*router.get('/demo',function(req,res){
   Application.remove({}).then(r => res.json({}));
 })*/


module.exports = router;
