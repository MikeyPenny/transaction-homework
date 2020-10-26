import React from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Login from '../../UI/Login/Login';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Logo />
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <nav className={classes.Desktop}>
                <NavigationItems />
            </nav>
            <Login />
        </header>
    );
}

export default Toolbar;
