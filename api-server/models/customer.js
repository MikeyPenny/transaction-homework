const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const customerSchema =  new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: String,
    name: String,
    surname: String,
    password: String,
    accounts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;