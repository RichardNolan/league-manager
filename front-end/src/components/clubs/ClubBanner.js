import React from 'react';
import { withStyles, CardHeader, Avatar } from '@material-ui/core';

const ClubBanner = (props) => {
    let {club, classes} = props
    let clubName = club && (club.title || null)
    let clubCrest = club && club.crest && (<img src={club.crest}  className={classes.crest} alt='crest' /> || null)
    let pageTitle = props.team ? `${clubName} - ${props.team}` : clubName
    return (
        <CardHeader
            avatar={
                <Avatar style={{backgroundColor:'transparent'}}>{clubCrest}</Avatar>
            }
            title={pageTitle}
        />
    );
};

const styles=theme=>({
    root:{
        padding:theme.spacing.unit*2, 
    },
    crest:{
        width:'100%',
        height:'100%',
    }
})

export default withStyles(styles)(ClubBanner);