const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT;

// CMongoose connection to the DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log('Not connected', err);
});

// Listening to client from port 3000
app.use(cors({
    origin: ["http://localhost:3000", "localhost:3000"],
    credentials: true
}));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/auth', require('./routes/auth')); // Log in session route
app.use('/account', require('./routes/account')); // Account routes
app.use('/customer', require('./routes/customer')); // Customer routes
app.use('/transaction', require('./routes/transaction')); // Transaction routes

// Connection confirm
app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
})

module.exports = app;