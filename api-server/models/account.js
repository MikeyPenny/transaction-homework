const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
    _id: ObjectId,
    number: String,
    accountBalance: Number,
    transactions: [{ type: ObjectId, ref: 'Transaction' }],
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;