import React, { Component } from 'react'


import axios from 'axios';
import Aux from '../../hoc/Auxiliary';
import { Switch, Route } from 'react-router-dom';
import Home from '../../components/Home/Home';
import Account from '../../components/Customer/Accounts/Account';
import Customer from '../../components/Customer/Customer';
import Transaction from '../../components/Customer/Accounts/Transactions/Transaction';


export default class AppBuilder extends Component {

    constructor(props) {
        super();
    }

    state = {
        customers: [],
        customer: {},
        accounts: []
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
        })
        this.setState({customer: customers[index]});
    }

    extractInfoAccountHandler = () => {
         
        let accounts = [...this.state.customer.accounts];
        this.setState({accounts: accounts});
        this.props.history.push('/accounts');
        
    }

    render() {
        return (
            <Aux>
                <Switch>
                    <Route exact path="/">
                        <Home 
                            account={this.state.customer.customerId}
                            users={this.state.customers} 
                            selectCustomer={this.selectCustomerHandler}
                            readInfo={this.extractInfoAccountHandler} />
                    </Route>
                    <Route path="/customer">
                        <Customer />
                    </Route>
                    <Route path="/accounts">
                        <Account />
                    </Route>
                    <Route path="/transactions">
                        <Transaction />
                    </Route>
                </Switch>
            </Aux>
        )
    }
}
