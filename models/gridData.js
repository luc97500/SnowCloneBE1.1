const mongoose = require('mongoose')

const DataGridSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reason: { type: String },
    comment: { type: String },
    requestnumber: { type: String, default: "" },
    datetime: { type: String, default: "" },
  });
  
  const DataSchema = mongoose.model('GridData', DataGridSchema);
  module.exports = DataSchema;