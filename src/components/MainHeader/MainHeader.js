import React from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

function MainHeader(props) {
    return (
        <header className={classes['main-header']}>
            <h1>Dummy Authentication Page</h1>
            <Navigation />
        </header>
    );
}

export default MainHeader;
