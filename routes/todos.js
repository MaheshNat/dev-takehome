const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/', auth, (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    tags: req.body.tags,
    dueDate: req.body.dueDate,
    completed: false,
  });
  User.update({ _id: req.user.id }, { $push: { todos: todo } })
    .then((data) => {
      res.json(todo);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.get('/', auth, (req, res) => {
  User.findById(req.user.id)
    .then((result) => {
      res.json({ todos: result.todos });
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.patch('/:id', auth, (req, res) => {
  User.update(
    { _id: req.user.id, 'todos._id': req.params.id },
    {
      $set: {
        'todos.$.title': req.body.title,
        'todos.$.dueDate': req.body.dueDate,
        'todos.$.completed': req.body.completed,
        'todos.$.tags': req.body.tags,
        'todos.$.edited': true,
      },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.delete('/:id', auth, (req, res) => {
  User.update(
    { _id: req.user.id },
    {
      $pull: { todos: { _id: req.params.id } },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
