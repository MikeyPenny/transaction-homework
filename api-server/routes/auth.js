const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const Account = require('../models/account');
const mongoose = require('mongoose');

const saltRounds = 15;

router.get('/signup', (req, res) => {
    res.send('ok');
});

router.post('/signup', (req, res, next) => {
    
    let newCustomer = {name, surname, password, customerBalance, customerId} = req.body;

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) res.status(403).json({message: err});
        else {
            newCustomer.password = hash;
            Customer.create(newCustomer)
            .then(() => {
                res.status(200).json({message: 'user succesfully registered'});
            })
            .catch(err => {
                res.status(500).json({message: err});
            });
        }
    })

})

router.post('/login', (req, res, next) => {
    
    Customer.findOne({customerId: req.body.customerId})
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) res.status(500).json({message: err});
                else if(match) {
                    user = JSON.parse(JSON.stringify(user));
                    delete user.password;
                    
                    Account.aggregate([
                        {
                            '$match': {
                                'customer': mongoose.Types.ObjectId(user._id)
                            }
                            }, {
                            '$group': {
                                '_id': mongoose.Types.ObjectId(user._id), 
                                'total': {
                                '$sum': '$accountBalance'
                                }
                            }
                        }
                    ])
                    .then(data => {
                        
                        user.customerBalance = data[0].total;
                        req.session.user = user;
                        
                        res.status(200).json({message: 'Logged in', user: user});
                    })
                    .catch(err => {
                        res.status(403).json({message: err});
                    })
                    

                } else {
                    res.status(403).json({message: 'CustomerId or Password invalid'});
                }
            })
        } else {
            res.status(403).json({message: 'Data invalid'});
        }
    })
    .catch(err => {
        res.status(500).json({message: err});
    });

});

router.get('/get-user', (req, res) => {
    if (req.session.user) {
        res.status(200).json(req.session.user);
    } else {
        res.status(403).json({message: 'Not logged in'});
    }
});

router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.status(200).json({message: 'Logged out'});
    } else {
        res.status(403).json({message: 'Not logged in'});
    }
});

module.exports = router;