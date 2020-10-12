const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transactionSchema = new Schema({
    _id: ObjectId,
    transactionNumber: String,
    transactionAmount: Number,
    type: Number,
    date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;