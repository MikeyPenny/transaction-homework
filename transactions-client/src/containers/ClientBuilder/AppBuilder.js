import React, { Component } from 'react'

import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import { Switch, Route } from 'react-router-dom';
import Accounts from '../../components/Customer/Accounts/Accounts';
import Customer from '../../components/Customer/Customer';
import Transactions from '../../components/Customer/Accounts/Transactions/Transactions';
import NewTransaction from '../../components/Customer/Accounts/Transactions/NewTransaction/NewTransaction';

export default class AppBuilder extends Component {

    state = {
        customers: [],
        customer: {},
        accounts: [],
        newAccount: false,
        number: '',
        initialCredit: '',
        newCredit: '',
        accountId: '',
        idCustomer: '',
        isSelected: true
    }

    componentDidMount = () => {
        this.loadUsers();
    }

    loadUsers = () => {
        // e.preventDefault();
        axios({
            url:`${process.env.REACT_APP_BACK_END_BASE_URL}/customer/customers-info`,
            method: 'get',
            withCredentials: true
        })
        .then(response => {
            let arrayCustomers = [...response.data.customers];
            this.setState({ customers: arrayCustomers });

        })
        .catch(err => {
            console.log('Error ' + err);
        });
    }

    selectCustomerHandler = (e) => {
        let customers = [...this.state.customers];
        const index = customers.findIndex(customer => {
            return customer.customerId === e.target.value
        });
        let customer = customers[index];
        let balance = customer.accounts.reduce((acc, account) => {
            return acc + account.accountBalance;
        }, 0);
        let transactions = [];
        customer.accounts.map(account => {
            return account.transactions.map(transaction => {
                return transactions.push(transaction);
            })
        });
        customer.balance = balance;
        customer.transactions = transactions;
        this.setState({
            customer: customer,
            accounts: customer.accounts,
            isSelected: false
        });
        
    }

    extractInfoAccountHandler = () => {
        let accounts = [...this.state.customer.accounts];
        this.setState({accounts: accounts});
    }

    requestNewAccount = () => {

        const newAccountData = {
            id: this.state.customer._id,
            number: this.state.number,
            initialCredit: this.state.initialCredit
        }

        axios({
            url:`${process.env.REACT_APP_BACK_END_BASE_URL}/account/new_account`,
            data: newAccountData,
            method: 'post',
            withCredentials: true
        })
        .then(response => {
            let account = response.data.account;
            let transaction;
            if (response.data.transaction) {
                transaction = response.data.transaction;
                account.transactions[0] = transaction;
            }

            this.reloadCustomer(account);
        })
        .catch(err => {
            console.log('Error ' + err);
        });
        
    }

    reloadCustomer = (account) => {
        let customer = this.state.customer;
        customer.accounts.push(account);
        let balance = customer.accounts.reduce((acc, account) => {
            return acc + account.accountBalance;
        }, 0);
        
        if (account.transactions.length > 0) {
            let transactions = [];    
            customer.accounts.map(account => {
                return account.transactions.map(transaction => {
                    return transactions.push(transaction);
                })
            });
            customer.transactions = transactions;    
        }
        customer.balance = balance;
        this.setState({
            customer: customer, 
            newAccount: false,
            number: '',
            initialCredit: ''
        });
    }

    newAccountShowHandler = (e) =>{
        e.preventDefault();
        let show = !this.state.newAccount;
        this.setState({newAccount: show});
    }

    hideShowNewAccount = (e) => {
        e.preventDefault();
        let hide = !this.state.newTransaction;
        this.setState({newTransaction: hide});
        console.log('hey')
    }

    accountChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    selectAccountHandler = (e) => {
        let accounts = [...this.state.accounts];
        const index = accounts.findIndex(account => {
            return account._id === e.target.value
        });
        let account = accounts[index];
        this.setState({
            accountId: e.target.value,
            idCustomer: account.number
        });
    }

    requestNewTransaction = () => {

        const data = {
            id: this.state.accountId,
            accountId: this.state.idCustomer,
            transactionAmount: this.state.newCredit
        }
        
        axios({
            url:`${process.env.REACT_APP_BACK_END_BASE_URL}/transaction/new-transaction/`,
            data: data,
            method: 'post',
            withCredentials: true
        })
        .then(response => {
            let transaction = response.data.transaction;
            this.loadNewTransaction(transaction);            
        })
        .catch(err => {
            console.log('Error ' + err);
        });        

    }

    loadNewTransaction = (transaction) => {
        let customer = this.state.customer;
        // Add transaction
        const index = customer.accounts.findIndex(account => {
            return account.number === this.state.idCustomer
        });
        customer.accounts[index].transactions.push(transaction);
        // Update account balance
        let account = customer.accounts[index];
        account.accountBalance = account.accountBalance + transaction.transactionAmount;
        
        // Customer balance
        let balance = customer.accounts.reduce((acc, account) => {
            return acc + account.accountBalance;
        }, 0);
        // Update transaction list
        let transactions = [];
        customer.accounts.map(account => {
            return account.transactions.map(transaction => {
                return transactions.push(transaction);
            })
        })
        customer.balance = balance;
        customer.transactions = transactions;
        this.setState({
            customer: customer,
            newCredit: '',
            idCustomer: ''
        });

    }

    render() {
        return (
            <Aux>
                <Switch>
                    <Route exact path="/">
                        <Customer
                            customer={this.state.customer}
                            users={this.state.customers} 
                            selectCustomer={this.selectCustomerHandler}
                            readInfo={this.extractInfoAccountHandler}
                            accounts={this.state.accounts}
                            selected={this.state.isSelected} />
                    </Route>
                    <Route path="/accounts">
                        <Accounts 
                            accounts={this.state.accounts}
                            show={this.state.newAccount}
                            changeVisible={this.newAccountShowHandler}
                            accountChange={this.accountChangeHandler}
                            customer={this.state.customer}
                            newNumber={this.state.number}
                            initCredit={this.state.initialCredit}
                            requestAccount={this.requestNewAccount} />
                    </Route>
                    <Route path="/transactions">
                        <Transactions 
                                transactions={this.state.customer.transactions}
                                accounts={this.state.accounts}
                                change={this.accountChangeHandler}
                                visible={this.hideShowNewAccount}
                                selected={this.state.isSelected} />
                    </Route>
                    <Route>
                        <NewTransaction 
                                    accounts={this.state.accounts}
                                    selectAccount={this.selectAccountHandler}
                                    numberAccount={this.state.idCustomer}
                                    requestTransaction={this.requestNewTransaction}
                                    changeVal={this.accountChangeHandler}
                                    credit={this.state.newCredit} />
                    </Route>
                </Switch>
            </Aux>
        )
    }
}
