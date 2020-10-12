const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const Account = require('../models/account');
const mongoose = require('mongoose');
// const ObjectId = new mongoose.Schema.Types.ObjectId();

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
        customerBalance: req.body.customerBalance, 
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
                    
                    if (user.accounts.length > 0) {
                        let total = user.accounts.reduce((accum, account) => {
                            return accum + account.accountBalance;
                        },0);
                        user.customerBalance = total;
                        req.session.user = user;
                        res.status(200).json({message: 'Logged in', user: user});
                    } else {
                        req.session.user = user;
                        res.status(200).json({message: 'Logged in', user: user});
                    }
                    
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

// Account.aggregate([
//     {
//         '$match': {
//             'customer': mongoose.Types.ObjectId(user._id)
//         }
//         }, {
//         '$group': {
//             '_id': mongoose.Types.ObjectId(user._id), 
//             'total': {
//             '$sum': '$accountBalance'
//             }
//         }
//     }
// ])
// .then(data => {
//     if (data[0].total) {
//         debugger
//         user.customerBalance = data[0].total;
//         req.session.user = user;
        
//         res.status(200).json({message: 'Logged in', user: user});
//     } else {
//         req.session.user = user;
//         res.status(200).json({message: 'Logged in', user: user});
//     }
// })
// .catch(err => {
//     debugger
//     res.status(403).json({message: `Error login ${err}`});
// })

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