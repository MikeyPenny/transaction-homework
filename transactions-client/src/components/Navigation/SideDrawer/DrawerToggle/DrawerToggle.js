import React from 'react';

import classes from './DrawerToggle.module.css';

const DrawerToggle = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div className={classes.BurgerContainer}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default DrawerToggle;
