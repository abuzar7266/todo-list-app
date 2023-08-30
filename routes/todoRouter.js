var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var authenticate = require("../auth");
const TodoController = require("../controllers/todoController");

router.use(bodyParser.json());

router
  .route("/")
  .get(authenticate.verifyUser, TodoController.getAllTodos)
  .post(authenticate.verifyUser, TodoController.addTodo);
router
  .route("/:id")
  .put(authenticate.verifyUser, TodoController.updateTodo)
  .delete(authenticate.verifyUser, TodoController.deleteTodo);

module.exports = router;


// End of File
