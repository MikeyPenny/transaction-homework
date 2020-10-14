import React from 'react';

const Account = (props) => {
    return (
        <tr>
            <td>{props.account}</td>
            <td>{props.balance}</td>
        </tr>
    );
}

export default Account;
