import React from 'react';

const Transaction = (props) => {
    return (
            <tr>
                <td>{props.number}</td>
                <td>{props.amount}</td>
                <td>{props.date}</td>
            </tr>
    );
}

export default Transaction;
