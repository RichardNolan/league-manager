import React from 'react';

import { Grid, Typography, Paper, withStyles, Zoom } from '@material-ui/core';

 
const Home = (props) => {

    return (
        <Grid container>
            <Grid item lg={3} md={2} sm={1}/>    
            <Grid item lg={6} md={8} sm={10}>
                <Zoom in={true} style={{ transitionDelay: 500 }}>
                    <Paper className={props.classes.paper}>
                        <Typography variant='display3' className={props.classes.heading} gutterBottom>
                            League Manager
                        </Typography>
                        <Typography variant='title' gutterBottom>
                            Minimal League Management Application
                        </Typography>
                        <Typography variant='subheading'>
                            Just the essentials
                        </Typography>
                    </Paper>
                </Zoom>
            </Grid>
        </Grid>
    );
};


const styles = theme=>({
    paper:{
        padding:theme.spacing.unit*3,
    },
    heading:{
        color:theme.palette.primary.main,
    },
})

export default withStyles(styles)(Home);