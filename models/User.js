const mongoose = require('mongoose');
const TodoSchema = require('./Todo').schema;

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  register_date: { type: Date, default: Date.now },
  todos: [TodoSchema],
});

module.exports = mongoose.model('Users', UserSchema);
