const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Customer = require('../models/customer');
const Transaction = require('../models/transaction');
const mongoose = require('mongoose');

router.get('/transaction', (req, res) => {
    res.send('ok');
});

router.post('/new-transaction', (req, res) => {
    
    let newTransaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        transactionNumber: "",
        transactionAmount: req.body.transactionAmount,
        type: 1,
        date: new Date()
    });

    Account.findById(req.body.id)
    .populate('transactions')
    .then(account => {
        
        let consecutive = account.transactions.length + 1;
        newTransaction.transactionNumber = `${req.body.accountId}-0${consecutive}`
        account.transactions.push(newTransaction._id);
        account.accountBalance = account.accountBalance + parseInt(req.body.transactionAmount);
        debugger
        Account.updateOne({ _id: account._id }, { $set: { transactions: account.transactions, accountBalance: account.accountBalance } })
        .then(() =>{
            newTransaction.save()
            .then(transaction => {
                res.status(200).json({transaction: transaction});
            })
            .catch(err => {
                res.status(403).json({message: `Transaction write failed - ${err}`})
            });
        })
        .catch(err => {
            res.status(403).json({error: `Account update failed - ${err}`});
        });
    })
    .catch(err => {
        res.status(404).json({error: `Account not found - ${err}`});
    });
    
});

router.get('/transactions', (req, res) => {

    const _id = req.session.user._id;
    
    Customer.find({_id: _id})
    .populate({
        path: 'accounts',
        populate: {
            path: 'transactions'
        }
    })
    .then(accounts => {
        res.status(200).json({response: accounts});
    })
    .catch(err => {
        res.status(404).json({error: err});
    });

});




module.exports = router;