import React, { Fragment } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom'

import USER from '../../USER'
import * as moment from 'moment'

const Result = (props) => {
    let {result} = props

    const openNewScoreDialog = ()=>{
        props.openNewScoreDialog(result)
    }
    let showDateTime = props.showDate ? "ddd, MMM Do" : null
    return (
        <Fragment>
        {result && (
            <Grid container className={props.classes.root} >
                <Grid item xs={4}>
                    <Typography variant="subheading"  className={props.classes.right} >
                        <Link to={`/team/${result.home_team._id}`} from={window.location.pathname}>{result.home_team.club.title_short}</Link>
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.score}>
                    <Typography variant="headline" >
                        {result.score_home } - {result.score_away}                        
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.buttonContainer}>
                    <Typography variant="subheading"  className={props.classes.left} >
                        <Link to={`/team/${result.away_team._id}/`}>{result.away_team.club.title_short}</Link>
                    </Typography>
                    <USER.Consumer>
                        {({user})=>{
                            return !props.shortForm && user.user && (user.user.isAdmin || user.user.isLeagueSecretary)
                                ? (
                                    <IconButton color="primary" className={props.classes.editButton} onClick={openNewScoreDialog}>
                                      <EditIcon />
                                    </IconButton>
                                  )
                                : null
                        }}
                    </USER.Consumer>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" >
                        {props.showDate && moment(result.date).format(showDateTime)}
                    </Typography>
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
        borderBottom: [
            [1, 'solid', 'lightgrey']
          ],
    },
    right:{
        textAlign:'right',
    },
    left:{
        textAlign:'left',
    },
    center:{
        textAlign:'center',
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
    score:{
        display: 'flex',      
        justifyContent: 'center',
        backgroundColor:theme.palette.background.primary,
    }
})
export default withStyles(styles)(Result)  