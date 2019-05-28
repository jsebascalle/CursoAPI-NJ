var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.json({"nombre":"Juan","apellido":"calle","otro":"este"});
});

router.post('/users', function(req, res) {
  console.log(req.body.name);
  res.send(req.body.name);
});

module.exports = router;
