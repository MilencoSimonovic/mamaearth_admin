import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'component/Header.js';
const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function Campaign() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header />
        </div>
    )
}

export default Campaign;