const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
  title: { type: String, required: true },
  tags: { type: Array, required: true },
  edited: { type: Boolean, default: false },
  date: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date, required: true, default: Date.now },
  completed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Todo', TodoSchema);
