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
  expiresAfter: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    // default: Date.now,
  },
  expires: {
    type: Date,
  },
});
clipBoardSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });
//Added TTL index via mongo shell
// db.docs.clipboards( { expires:1 }, { expireAfterSeconds: 0 } )

module.exports = mongoose.model("clipboard", clipBoardSchema);
