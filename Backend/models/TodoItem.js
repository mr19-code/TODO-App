const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);