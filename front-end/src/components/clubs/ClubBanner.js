import React from 'react';
import { withStyles, Avatar, AppBar, Toolbar, Typography } from '@material-ui/core';

const ClubBanner = (props) => {
    let {club, classes} = props
    let clubName = club && (club.title || null)
    let clubCrest = club && club.crest && (<img src={club.crest}  className={classes.crest} alt='crest' /> || null)
    let pageTitle = props.team ? `${clubName} - ${props.team}` : clubName
    return (
         
        <AppBar position="static">
            <Toolbar>
                <Avatar className={classes.avatar}>{clubCrest}</Avatar>
                <Typography variant="title" color="inherit">
                    {pageTitle}
                </Typography>
            </Toolbar>
        </AppBar>              
        
    );
};

const styles=theme=>({
    root:{
        padding:theme.spacing.unit*2, 
    },
    crest:{
        width:'100%',
        height:'100%',
    },
    avatar:{
        marginRight: theme.spacing.unit*2,
        backgroundColor:'transparent',
    }
})

export default withStyles(styles)(ClubBanner);