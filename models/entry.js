const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  uid: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  start_bed: {
    type: Number,
    required: true
  },
  start_sleep: {
    type: Number,
    required: true
  },
  end_sleep: {
    type: Number,
    required: true
  },
  end_bed: {
    type: Number,
    required: true
  },
  awake: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  }
});

module.exports = Entry = mongoose.model("entries", EntrySchema);
