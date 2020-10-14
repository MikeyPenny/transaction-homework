import React from 'react';
import Transactions from '../Customer/Accounts/Transactions/Transactions';
import { useHistory } from 'react-router-dom';

import classes from './Customer.module.css';

const Customer = (props) => {

    let history = useHistory();
    let usersJsx = null;
    let customer = null;

    if (props.users.length > 0) {
        usersJsx = props.users.map((user) => {
            return <option key={user.customerId} value={user.customerId}>{user.name}</option>
        })
    } else {
        usersJsx = "Loading...";
    }

    if (props.customer) {
        customer = props.customer;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/accounts');
    }

    return (
        <div className={classes.Customer}>
            <form onSubmit={handleSubmit} className={classes.FormDiv}>
                <div className={classes.LabelDiv}>
                    <label>
                        <span>Select Customer: </span>
                        <select name="select" value="" onChange={props.selectCustomer}>
                            <option key="1" value="">Select Customer</option>
                            {usersJsx}
                        </select>
                    </label>
                </div>
                <div className={classes.DataDiv}>
                    <p>Customer Id:  {customer.customerId}</p>
                    <p>Name:  {customer.name}</p>
                    <p>Surname:  {customer.surname}</p>
                    <p>Balance:  {customer.balance}</p>

                    <button className={classes.Button}>Get Account info</button>
                </div>
                
                
            </form>
            <Transactions 
                    transactions={customer.transactions} 
                    accounts={props.accounts}
                    select={props.select} />
        </div>
    );
}

export default Customer;
