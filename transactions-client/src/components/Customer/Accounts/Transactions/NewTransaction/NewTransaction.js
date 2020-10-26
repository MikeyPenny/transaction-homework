import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './NewTransaction.module.css';

const NewTransaction = (props) => {

    let history = useHistory();
    let accountJsx = null;

    if (props.accounts.length > 0) {
        accountJsx = props.accounts.map(account => {
            return <option key={account._id} value={account._id}>{account.number}</option>
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.requestTransaction()
        history.push('/');
    }    

    return (
    
        <div className={classes.NewTransaction}>
            
            <form onSubmit={submitForm}>
                <label>
                    
                    <select name="select" value="" onChange={props.selectAccount}>
                        <option key="1" value="">Select Account</option>
                        {accountJsx}
                    </select>
                </label>
                <p>Account: {props.numberAccount}</p>
                <div className={classes.InputDiv}>
                    <input  
                        type="text" 
                        placeholder="Initial credit" 
                        name="newCredit" 
                        onChange={props.changeVal}
                        value={props.initCredit} />
                    <button>Send Transaction</button>
                </div>
                
            </form>            
        </div>

       
        
    );
}

export default NewTransaction;
