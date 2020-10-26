import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    
    let attachedClasses;

    props.open ? attachedClasses = [classes.SideDrawer, classes.Open] 
    : attachedClasses = [classes.SideDrawer, classes.Close]; 
    
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;
