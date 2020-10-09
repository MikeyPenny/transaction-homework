const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = mongoose.model('transactions', new Schema({
    transactionNumber: String,
    transactionAmount: Number,
    type: Number,
    date: Date,
    account : {type: mongoose.Schema.Types.ObjectId, ref: 'accounts'}
}));

module.exports = Transaction;