import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';

const ClubBanner = (props) => {
    let {club, classes} = props
    let clubName = club && (club.title || null)
    let clubCrest = club && club.crest && (<img src={club.crest}  className={classes.crest} alt='crest' /> || null)
    return (
        <Grid container className={classes.root}>    
            <Grid item xs={4} sm={2} md={1} className={classes.banner}>
                <div>{clubCrest}</div>         
            </Grid>     
            <Grid item xs={8}>
                <Typography variant='headline'>
                    {clubName}
                </Typography>
            </Grid>   
        </Grid>
    );
};

const styles=theme=>({
    root:{
        padding:theme.spacing.unit*2, 
    },
    crest:{
        width:'100%',
        height:'100%',
        paddingRight:theme.spacing.unit*4, 
    }
})

export default withStyles(styles)(ClubBanner);