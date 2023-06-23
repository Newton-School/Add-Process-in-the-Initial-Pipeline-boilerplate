const mongoose = require("mongoose");

const processSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    cost: {
      type: Number,
      required: true
    },
    nextProcess:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Process',
        default: null
    }
  }
);

module.exports = mongoose.model("Process", processSchema);