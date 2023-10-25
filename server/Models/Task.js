const mongoose = require("mongoose");

const mongooseSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  lastModified: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", mongooseSchema);
module.exports = Task;
