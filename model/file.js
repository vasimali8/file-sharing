const mongoose = require("mongoose");

const FileSchmema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    downloadCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", FileSchmema);

