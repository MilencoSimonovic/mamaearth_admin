import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart';

import style from 'assets/jss/components/HeaderStyle.js';

const useStyles = makeStyles(style);

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.content}>
                <Toolbar className={classes.toolContent}>
                    <BarChartIcon />
                    <Typography variant="h6" className={classes.title}>
                        Famefactory
                    </Typography>
                    <div className={classes.menu}>
                        <div className="menu-item active">Influence</div>
                        <div className="menu-item">Analytics</div>
                        <div className="menu-item">Campaigns</div>
                        <div className="menu-item">Content</div>
                    </div>
                    <Button color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}