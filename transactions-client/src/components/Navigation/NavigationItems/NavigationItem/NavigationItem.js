import React from 'react';

import { Link } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
           <Link 
                to={props.link} 
                className={props.active ? classes.active : null}>
                {props.children}
           </Link> 
        </li>
    );
}

export default NavigationItem;
