import React from 'react';
import { useHistory } from 'react-router-dom';

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
    
        <div>
            
            <form onSubmit={submitForm}>
                <label>
                    <span>Select Account: </span>
                    <select name="select" value="" onChange={props.selectAccount}>
                        <option key="1" value="">Select Account</option>
                        {accountJsx}
                    </select>
                </label>
                <p>Account: {props.numberAccount}</p>
                <input  
                    type="text" 
                    placeholder="Initial credit" 
                    name="newCredit" 
                    onChange={props.changeVal}
                    value={props.initCredit} />
                <button>Send Transaction</button>
            </form>            
        </div>

       
        
    );
}

export default NewTransaction;
