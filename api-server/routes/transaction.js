const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Customer = require('../models/customer');
const Transaction = require('../models/transaction');

router.get('/transaction', (req, res) => {
    res.send('ok');
});

router.post('/new-transaction/:id', (req, res) => {

    const _id = req.params.id;
    
    Account.find({})

    let newTransaction = new Transaction({
        transactionNumber,
        transactionAmount,
        type,
        date,
        account: _id
    });



});

router.get('/transactions', (req, res) => {

    // const _id = req.session.user._id;
    
    Customer.find()
    .populate({path: 'accounts'})
    .exec()
    .then(accounts => {
        res.status(200).json({response: accounts});
    })
    .catch(err => {
        res.status(404).json({error: err});
    });

});


module.exports = router;