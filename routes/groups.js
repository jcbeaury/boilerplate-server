var express = require('express');
var router = express.Router();

/* GET all groups */
router.get('/', function(req, res, next) {
  res.send({groups: [{name: 'Group 1'}, {name: 'Group 2'}, {name: 'Group 3'}]});
});

module.exports = router;
