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
                    <Paper className={props.classes.circle} >
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
                <Typography variant='title' gutterBottom>
                    League manager allows you to administer your soccer league and communicate with your audience all in one place. 
                </Typography>
                <Typography variant='subheading'>
                    If all parties fulfil their own responsibilites the application is entire self-administering. If referee's and club officials all agree on a score, then that will be the final score. No longer does the league secretary need to sit and collate the hundreds of results coming in by text, email or by phone call. 
                </Typography>
                <Typography variant='subheading'>
                    Just set up the fixtures and everything will be visible to everyone.
                </Typography>
            </Grid>
        </Grid>
    );
};

const styles = theme=>({
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
        backgroundColor:theme.palette.primary.main
    },
    circleText:{
        color:'white',
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
})

export default withStyles(styles)(Advert)