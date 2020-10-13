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
    
    let newCustomer = new Customer({
        _id: new mongoose.Types.ObjectId(),
        customerId: req.body.customerId,
        name: req.body.name, 
        surname: req.body.surname, 
        password: req.body.password,
        accounts: []
    });

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
    .populate({
        path: 'accounts',
        populate: {
            path: 'transactions' 
        }
    })
    .then((user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) res.status(500).json({message: err});
                else if(match) {
                    user = JSON.parse(JSON.stringify(user));
                    delete user.password;
                    req.session.user = user;
                    
                    res.status(200).json({message: 'Logged in', user: user});
                    
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

router.get('get-users', (req, res) => {

    Customer.find()
    .populate({
        path: 'accounts', 
        populate: {
            path: 'transactions',
        }
    })
    .then(accounts => {
        res.status(200).json({response: accounts});
    })
    .catch(err => {
        res.status(403).json({message: err});
    });

})

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