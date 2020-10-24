import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = (props) => {
    return (
        <Aux>
            <div className={classes.SideDrawer}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;
