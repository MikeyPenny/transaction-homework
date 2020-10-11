const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const Customer = require('../models/customer');

router.get('/customer', (req, res) => {
    res.send('ok');
});

router.get('/customer-info', (req, res) => {

    const _id = req.session.user._id;
    debugger
    Customer.findOne({_id: _id})
    .then(customer => {
        
        res.status(200).json({customer: customer})
    })
    .catch(err => {
        res.status(403).json({message: err});
    });
    


});

module.exports = router;