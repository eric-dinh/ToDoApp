var express = require('express');

var router = express.Router();
var todos = require('../api/todo.route');


router.use('/todo', todos);


module.exports = router;