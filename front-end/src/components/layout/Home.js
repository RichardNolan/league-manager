import React from 'react';

import { Typography, withStyles } from '@material-ui/core';
 
const Home = (props) => {

    return (
        <div className={props.classes.paper}>
            <Typography variant='display3' className={props.classes.heading} gutterBottom>
                League Manager
            </Typography>
            <Typography variant='title' gutterBottom>
                Minimal League Management Application
            </Typography>
            <Typography variant='subheading'>
                Just the essentials
            </Typography>
        </div>
    );
};


const styles = theme=>({
    paper:{
        padding:theme.spacing.unit*4,
    },
    heading:{
        color:theme.palette.primary.main,
    },
})

export default withStyles(styles)(Home);