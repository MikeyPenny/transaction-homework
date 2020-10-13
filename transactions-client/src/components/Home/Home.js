import React from 'react';


const Home = (props) => {

    let usersJsx = null;
    let account = null;

    if (props.users.length > 0) {
        usersJsx = props.users.map((user) => {
            return <option key={user.customerId} value={user.customerId}>{user.name}</option>
        })
    } else {
        usersJsx = "Loading...";
    }

    if (props.account) {
        account = props.account;
    } else {
        account = '';
    }

    return (
        <div>
            <label>
                <span>Select User</span>
                <select name="select" onChange={props.selectCustomer}>
                    {usersJsx}
                </select>
            </label>
            <p>Customer Id:  {account}</p>
            <button onClick={props.readInfo}>Accounts</button>
        </div>
    );
}

export default Home;
