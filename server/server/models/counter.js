const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model('Counter', CounterSchema);
