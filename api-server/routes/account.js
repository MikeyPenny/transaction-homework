const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Account = require('../models/account');
const { find } = require('../models/customer');


router.get('/account', (req, res) => {
    res.send('ok');
});

router.post('/new-account', (req, res) =>{
    const _id = req.session.user._id;

    let newAccount = {number, initialCredit} = req.body;
    
    newAccount = new Account({
        number,
        accountBalance: req.body.initialCredit,
        customer: _id
    });

    Account.findOne({number: newAccount.number, customer: newAccount.customer})
    .then(account => {
        if (account) res.status(403).json({message: 'Account number already exists'});
        else {
            newAccount.save()
            .then(() => {
                res.status(200).json({message: 'Account created succesfully'})
            })
            .catch(err => {
                res.status(500).json({message: `Noot ${err}`});
            })
        }
    })
    .catch((err) => {
        res.status(500).json({message: `Error  ${err}`});
    });

});

router.get('/accounts', (req, res) => {
    
    const _id = req.session.user._id;
    
    Account.aggregate([
        {
          '$match': {
            'customer': mongoose.Types.ObjectId(_id)
          }
        }, {
          '$group': {
            '_id': mongoose.Types.ObjectId(_id), 
            'total': {
              '$sum': '$accountBalance'
            }
          }
        }
    ])
    .then(data => {
        res.status(200).json({response: data});
    })
    .catch(err => {
        res.status(500).json({message: err});
    })

});

module.exports = router;