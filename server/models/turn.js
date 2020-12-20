const mongoose = require("mongoose");

const turnSchema = new mongoose.Schema(
  {
    order: {
      type: [
        {
          userID: { type: mongoose.Schema.Types.ObjectId, required: true },
          ranking: { type: Number, required: true },
        },
      ],
      required: true,
    },
    restaurant: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Turn = mongoose.model("turn", turnSchema);

module.exports = Turn;
