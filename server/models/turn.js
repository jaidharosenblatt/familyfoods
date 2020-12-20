const mongoose = require("mongoose");

const turnSchema = new mongoose.Schema(
  {
    offset: {
      type: Number,
      required: true,
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Turn = mongoose.model("turn", turnSchema);

module.exports = Turn;
