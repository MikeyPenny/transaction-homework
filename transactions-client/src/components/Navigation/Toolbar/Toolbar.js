import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Login from '../../UI/Login/Login';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            
            <Logo />
            <nav className={classes.Desktop}>
                <NavigationItems />
            </nav>
            <Login />
        </header>
    );
}

export default Toolbar;
