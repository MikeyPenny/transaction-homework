import React from 'react';

import classes from './Logo.module.css';
import blueHarvestLogo from '../../assets/images/blueHarvest-logo.png'; 

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={blueHarvestLogo} alt="BlueHarvest" />
        </div>
    );
}

export default Logo;
