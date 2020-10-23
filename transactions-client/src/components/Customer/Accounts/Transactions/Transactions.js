import React from 'react';
import Transaction from './Transaction/Transaction';
import classes from './Transactions.module.css';
import { Link } from 'react-router-dom';

const Transactions = (props) => {

    let transactionJsx;

    if (props.transactions) {
        transactionJsx = props.transactions.map(transaction => {
            return <Transaction key={transaction._id}
                                number={transaction.transactionNumber} 
                                amount={transaction.transactionAmount} 
                                date={transaction.date} /> 
        })
    } else {
        transactionJsx = <tr><td>No customer selected yet.</td></tr>
    }

    return (
        <div className={classes.Transactions}>
            <div className={classes.Head}>
                <h3>Transactions</h3>
                <Link className={classes.NewTrans} to="/newTransaction">New Transaction</Link>
            </div>
            <table className={classes.Table}>
                <tbody>
                    <tr>
                        <th>Number</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                    {transactionJsx}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
