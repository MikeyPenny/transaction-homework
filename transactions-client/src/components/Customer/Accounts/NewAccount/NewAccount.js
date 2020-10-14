import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './NewAccount.module.css';

const NewAccount = (props) => {

    let history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        props.requestAcc();
        history.push('/');
    }

    return (

        props.show ? 

        <form onSubmit={submitForm} className={classes.NewAccount} >
            <input  
                    type="text" 
                    placeholder="Account number" 
                    name="number" 
                    onChange={props.accountChange} value={props.newNumber} />
            <input  
                    type="text" 
                    placeholder="Initial credit" 
                    name="initialCredit" 
                    onChange={props.accountChange}
                    value={props.initCredit} />
            <button className={classes.Button}>Request Account</button>
        </form>

        :
        
        null

    );
}

export default NewAccount;
