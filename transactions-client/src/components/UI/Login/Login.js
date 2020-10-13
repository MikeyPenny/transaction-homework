import React from 'react';

import classes from './Login.module.css';

const Login = (props) => {
    return (
        <div className={classes.Login}>
            <button>
                <p>Login</p>
                <i className="fa fa-lock" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default Login;
