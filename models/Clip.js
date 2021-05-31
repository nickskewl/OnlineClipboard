const mongoose = require("mongoose");

const clipBoardSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("clipboard", clipBoardSchema);
