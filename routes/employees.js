var express = require('express');
var router = express.Router();

/* GET all employees */
router.get('/', function(req, res, next) {
  res.send({employees: [{name: 'Employee 1'}, {name: 'Employee 2'}, {name: 'Employee 3'}, {name: 'Employee 4'}, {name: 'Employee 5'}]});
});

module.exports = router;
