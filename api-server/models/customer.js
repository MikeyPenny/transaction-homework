const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = mongoose.model('customers', new Schema({
    customerId: String,
    name: String,
    surname: String,
    password: String,
    customerBalance: Number
}));

module.exports = Customer;