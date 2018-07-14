import React, { Fragment } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Create';

import USER from '../../USER'
// import { relative, isAbsolute } from 'path';
import * as moment from 'moment'

const Fixture = (props) => {
    let {fixture} = props

    const openEditFixtureDialog = ()=>{
        props.openEditFixtureDialog(fixture)
    }

    return (
        <Fragment>
        {fixture && (
            <Grid container className={props.classes.root} >
                <Grid item xs={4}>
                    <Typography variant="subheading" gutterBottom className={props.classes.right} >
                        {fixture.home_team.club.title_short}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.v}>
                    <Typography variant="caption" gutterBottom>
                        {fixture.home_team.club.venue }<br/>
                        {moment(fixture.date).format("HH:mm")}
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.buttonContainer}>
                    <Typography variant="subheading" gutterBottom className={props.classes.left} >
                        {fixture.away_team.club.title_short}
                    </Typography>
                    <USER.Consumer>
                        {({user})=>{
                            return user.user && (user.user.isAdmin || user.user.isLeagueSecretary) 
                                ? (
                                    <IconButton color="primary" className={props.classes.editButton} onClick={openEditFixtureDialog}>
                                      <EditIcon />
                                    </IconButton>
                                  )
                                : null
                        }}
                    </USER.Consumer>
                </Grid>
            </Grid>
        )}
        </Fragment>
    )
}

const styles = theme=>({
    root:{
        textAlign:'center',
        marginBottom:theme.spacing.unit,
    },
    right:{
        textAlign:'right',
    },
    left:{
        textAlign:'left',
    },
    buttonContainer:{
        position:'relative',
    },
    editButton:{
        position:'absolute',
        right:0,
        top: 0-theme.spacing.unit*2,
    },
    heading:{

    },
    v:{
        display: 'flex',      
        justifyContent: 'center',
    },
    vicon:{
        height:28,
        width:28,

    }
})
export default withStyles(styles)(Fixture)  