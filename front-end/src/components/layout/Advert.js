import React from 'react';
import { Grid, Slide, Paper, withStyles, Typography, Hidden } from '@material-ui/core';
import * as football from '../../assets/football_01.png'

const Advert = (props) => {
    return (
        
        <Grid container spacing={24} className={props.classes.root}>
        
        <Hidden only='xs'>
            <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit style={{transitionDelay:500}}>
                    <Paper className={props.classes.circle}>
                        <Typography variant='display1' className={props.classes.circleText}>
                            Quick
                        </Typography>
                    </Paper>
                </Slide>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit style={{transitionDelay:600}}>
                    <Paper className={props.classes.circle}>
                        <Typography variant='display1' className={props.classes.circleText}>
                            Simple
                        </Typography>
                    </Paper>
                </Slide>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit style={{transitionDelay:700}}>
                    <Paper className={props.classes.circle}>
                        <Typography variant='display1' className={props.classes.circleText}>
                            Free
                        </Typography>
                    </Paper>
                </Slide>
            </Grid>
            </Hidden>  
            <Hidden xsDown>
                <Grid item  sm={4} className={props.classes.sideImage}></Grid>
            </Hidden>
            <Grid item xs={12} sm={8}>
                <Typography variant='title'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Grid>
        </Grid>
    );
};

const styles = {
    root:{
        display:'flex', 
        justifyContent:'space-between',
        // height:250,
        marginTop:32,
    },
    circle:{
        borderRadius:'50%',
        width:150,
        height:150,
        margin:'auto',
    },
    circleText:{
        textAlign:'center',
        lineHeight:'150px',
    }, 
    sideImage:{        
        backgroundImage:"url('"+football+"')",
        backgroundSize:'contain',
        backgroundRepeat:'no-repeat',
        minHeight:300,
        // maxHeight:400,
    }
}

export default withStyles(styles)(Advert)