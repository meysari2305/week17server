const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const ClientModel = mongoose.model('Client', ClientSchema);

module.exports = ClientModel;
