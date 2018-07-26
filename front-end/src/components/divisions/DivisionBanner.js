import React from 'react';
import {Link} from 'react-router-dom'
import {Typography, withStyles,  Avatar, AppBar, Toolbar, IconButton} from '@material-ui/core'
import {PlayArrow} from '@material-ui/icons'
const DivisionBanner = (props) => {
    let {classes, division} = props
    return (
    <AppBar position="static" color='default'>
        <Toolbar>
            <Avatar className={classes.avatar} >{division.title.charAt(0) }</Avatar>
            <Typography variant="title" color="inherit" className={classes.flex}>
                Division - {division.title}
            </Typography>
            <IconButton component={Link} to={`/division/${division._id}`} >
                <PlayArrow/>
            </IconButton>
        </Toolbar>
    </AppBar>       
    );
};

const styles = theme=>( {
    flex:{
        flexGrow:1,
    },
    avatar:{
        marginRight: theme.spacing.unit*2,
    }

})


export default withStyles(styles)(DivisionBanner);