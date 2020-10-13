import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Home</NavigationItem>
            <NavigationItem link="/customer" >Customer</NavigationItem>
            <NavigationItem link="/accounts" >Account</NavigationItem>
            <NavigationItem link="/transactions" >Transactions</NavigationItem>
        </ul>
    );
}

export default NavigationItems;
