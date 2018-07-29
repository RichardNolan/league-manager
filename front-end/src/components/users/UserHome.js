import React from 'react';
import { withStyles, Typography } from '@material-ui/core';

const UserHome = (props) => {
    return (
        <div className={props.classes.root}>
            <Typography variant='display1' gutterBottom>
                Welcome back, {props.user.title}
            </Typography>
            <Typography variant='headline'>
                {props.user.email}
            </Typography>
        </div>
    );
};

const styles = theme=>({
    root:{
        padding:theme.spacing.unit*3,
    },
})

export default withStyles(styles)(UserHome);