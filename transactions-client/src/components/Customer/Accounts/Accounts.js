import React from 'react';
import Account from './Account/Account';

import classes from './Accounts.module.css';
import NewAccount from './NewAccount/NewAccount';

const Accounts = (props) => {

    let accountJsx =  props.accounts.map(account => {
        return <Account key={account._id} account={account.number} balance={account.accountBalance} />
    })

    if (props.accounts.length === 0) {
        accountJsx = <tr>
                        <td>No client selected</td>
                     </tr>
    }

    return (
        <div className={classes.Accounts}>
            <div className={classes.Left}>
                <h3>Accounts</h3>
                <table className={classes.Table}>
                    <tbody>
                        <tr>
                            <th>Account</th>
                            <th>Balance</th>
                        </tr>
                        {accountJsx}
                    </tbody>
                </table>
            </div>
            <div className={classes.Right}>
                <button className={classes.Button} onClick={props.changeVisible}>New Account</button>
                <NewAccount 
                        show={props.show} 
                        accountChange={props.accountChange}
                        newNumber={props.newNumber}
                        initCredit={props.initCredit}
                        requestAcc={props.requestAccount}
                        idCustomer={props.customer._id} />
            </div>
        </div>
    );
}

export default Accounts;
