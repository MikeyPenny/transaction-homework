# Transaction Assessnment

## Description

The assessment consists of an API to be used for opening a new “current account” of already existing
customers.

Requirements of the assessment
* The API will expose an endpoint which accepts the user information (customerID,
initialCredit).
* Once the endpoint is called, a new account will be opened connected to the user whose ID is
customerID.
* Also, if initialCredit is not 0, a transaction will be sent to the new account.
* Another Endpoint will output the user information showing Name, Surname, balance, and
transactions of the accounts.

# Technical Requirements
* Node.js
* MongoDB
* React.js

## Installation

Clone the repository in your terminal go to the api-server folder and run the next with npm 
(In case you don't have node installed) https://nodejs.org/es/

`run npm install `

It will start to download the packages to install the server API

You will need create a MongoDB connection with 3 collections (Customer, Account and Transactions) to start testing the API.
(You can use MongDB Compass to create a database with the 3 collections) https://www.mongodb.com/products/compass

**Once you have the database configured, you can type the next in your terminal to test the connection to the data base**

`run npm start` or
`run nodemon app.js`

If everything is Ok you will see the next message in the terminal

```
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
Listening at port: 3001
Connected to DB
```
In the api-server folder you can find a **data.json** file, you can use this file in your **MongoDB Compass **to import the customers collection data, the rest can be created on compass with the option **create collection** after create the schema in MongoDB Compass

Note.- The password field is not useful for this assessment.

Once you have the API server running you can open another terminal, go to the folder of the project and then go to the folder transactions-client.

Note.- Keep the server terminal running or you will need to restart the server later.

First you need to run this options to install all the dependecies of the application

`// You can run npm
npm start
// Or 
yarn install`

Then you can start the App with the next 2 options:

`// You can run npm
npm start
// Or 
yarn start`

You will see the next in you console:

```
You can now view transactions-client in the browser.
Compiled successfully!

You can now view transactions-client in the browser.
Compiled successfully!

You can now view transactions-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.---.---.16:3000      

Note that the development build is not optimized.   
To create a production build, use yarn build.
```

On the terminal where you started the server you will see the next:

```
GET /customer/customers-info 304 132.455 ms - -
GET /customer/customers-info 304 132.455 ms - -
```
This means the starting information about the customers has been loaded from the DB.

## Usage

In the main page you will see a **selector** to select the customer, the first time it will appear only the basic info of the customer
After the selection of the customer you can go to the Accounts Option and press the New Account Button where you can insert the information
of the Account and the Initial Credit and press the Request Account.

This operation will update the transaction list below the Customer info.

To request a New Transaction you can go to the New Transaction link from the landing page or from the Transactions option in the navigation bar.

Feel free to use it and send me your comments about the code, UX/UI, and other advices.


