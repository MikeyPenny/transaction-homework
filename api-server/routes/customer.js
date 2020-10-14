const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

router.get('/customer', (req, res) => {
    res.send('ok');
});


// Main route to load al the users, accounts, and transactions
router.get('/customers-info', (req, res) => {

    Customer.find()
    .populate({
        path: 'accounts',
        populate: {
            path: 'transactions'
        }
    })
    .then(customers => {
        res.status(200).json({customers: customers})
    })
    .catch(err => {
        res.status(403).json({message: err});
    });

});

module.exports = router;