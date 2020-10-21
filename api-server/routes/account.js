const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Account = require('../models/account');
const Transaction = require('../models/transaction');
const Customer = require('../models/customer');


router.get('/account', (req, res) => {
    res.send('ok');
});


router.post('/new_account', (req, res) => {

    const _id = req.body.id;

    let newAccount = {number, initialCredit} = req.body;
    
    newAccount = new Account({
        _id: new mongoose.Types.ObjectId(),
        number,
        accountBalance: req.body.initialCredit,
        transactions: []
    });

    let newTransaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        transactionNumber: `${req.body.number}-01`,
        transactionAmount: req.body.initialCredit,
        type: 1,
        date: new Date(),
    });

    

    Customer.findById({_id: _id})
    .then((customer) => {
        Account.findOne({number: newAccount.number})
        .then(account => {
            if (account) res.status(403).json({message: 'Account number already exists'});
            else {
                // If the account doesn't exists in the DB we update the account array in 
                // customer and save the transaction if the initial credit is greater than 0
                if (newAccount.accountBalance === 0) {
                    customer.accounts.push(newAccount._id)
                    Customer.updateOne({ _id: _id }, { $set: { accounts: customer.accounts} })
                    .then(() => {
                        newAccount.save()
                        .then((account) => {
                            res.status(200).json({account: account})
                        })
                        .catch(err => {
                            res.status(500).json({message: `Account create error: ${err}`});
                        });
                    })
                    .catch(err => {
                        res.status(403).json({message: 'Error updating account' +err});
                    });    
                } else {
                    newAccount.transactions.push(newTransaction._id);
                    customer.accounts.push(newAccount._id)
                    Customer.updateOne({ _id: _id }, { $set: { accounts: customer.accounts} })
                    .then(() => {

                        newAccount.save()
                        .then((account) => {
                            newTransaction.save()
                            .then((transaction) => {
                                res.status(200).json({account: account, transaction : transaction})
                            })
                            .catch(err => {
                                res.status(403).json({message: `Transaction err ${err}`});
                            });
                            
                        })
                        .catch(err => {
                            res.status(500).json({message: `Noot ${err}`});
                        });
                    })
                    .catch(err => {
                        res.status(403).json({message: 'Error updating account' +err});
                    });    
                }
            }
        })
        .catch(err => {
            res.status(404).json({message: 'Not found ' + err});
        })

        
    })
    .catch(err => {
        res.status(500).json({message: `Customer err: ${err}`});
    });

});

module.exports = router;