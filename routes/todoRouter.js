var express = require("express");
var router = express.Router();
var TodoSchema = require("../models/todoSchema");
const bodyParser = require("body-parser");
var authenticate = require("../auth");

router.use(bodyParser.json());
/*  Get all the tasks */

router.get("/", authenticate.verifyUser, async function (req, res, next) {
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
});
router.post("/", authenticate.verifyUser, async function (req, res, next) {
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
});

/*  PUT changes in task with id from todo list*/
router
  .route("/:id")
  .put(authenticate.verifyUser, function (req, res, next) {
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
  })
  .delete(authenticate.verifyUser, function (req, res, next) {
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
  });

module.exports = router;
