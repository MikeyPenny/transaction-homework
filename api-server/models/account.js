const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = mongoose.model('accounts', new Schema({
    number: String,
    accountBalance: Number,
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'customers'}
}));

module.exports = Account;