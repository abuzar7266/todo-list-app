var express = require('express');
var router = express.Router();

/*  Get all the tasks */
router.get('/', function(req, res, next) {
  res.send('GET all the tasks from todo list');
});

/*  POST new task in todo list */
router.post('/', function(req, res, next) {
  res.send('POST new task in todo list');
});


/*  PUT changes in task with id from todo list*/
router.put('/:id', function(req, res, next) {
  res.send('PUT changes in task with id from todo list');
});

/*  DELETE task  with id from todo list */
router.delete('/:id', function(req, res, next) {
  res.send('DELETE new task in todo list');
});

module.exports = router;
