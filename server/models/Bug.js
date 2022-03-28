const { Schema, model } = require('mongoose');
const User = require('./User');

const bugSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
  },
  assignee: {
      type: String,
      required: true
  },  
});

const Bug = model('Bug', bugSchema);

module.exports = Bug;