const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransType = mongoose.model('transTypes', new Schema({
    type: Number
}));

module.exports = TransType;