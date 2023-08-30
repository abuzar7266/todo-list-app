var TodoSchema = require("../models/todoSchema");
async function getAllTodos(req, res) {
  try {
    const response = await TodoSchema.find({ user: req.user._id });
    res.statusCode = 200;
    res.json({
      todo: response,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({ todo: [], status: false });
  }
}
async function addTodo(req, res, next) {
  try {
    const response = await TodoSchema.create({
      description: req.body.description,
      user: req.user._id,
    });
    res.statusCode = 200;
    res.json({ status: true, todo: response });
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: false });
  }
}
async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    TodoSchema.findOneAndUpdate({ _id: id, user: req.user._id }, req.body)
      .then((response) => {
        res.statusCode = 200;
        res.json({ status: true, response: response });
      })
      .catch((err) => {
        res.statusCode = 404;
        res.json({ status: false });
      });
  } catch (error) {
    res.statusCode = 500;
    res.json({ status: false });
  }
}
async function deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      TodoSchema.findOneAndDelete({ _id: id, user: req.user._id })
        .then((response) => {
          res.statusCode = 200;
          res.json({ status: true });
        })
        .catch((err) => {
          res.statusCode = 404;
          res.json({ status: false });
        });
    } catch (error) {
      res.statusCode = 500;
      res.json({ status: false });
    }
  }
module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo
};

// End of File

