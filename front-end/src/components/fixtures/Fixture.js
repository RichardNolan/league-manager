import React, { Fragment } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom'
import USER from '../../USER'
import * as moment from 'moment'

const Fixture = (props) => {
    let {fixture} = props

    const openEditFixtureDialog = ()=>{
        props.openEditFixtureDialog(fixture)
    }
    let showDateTime = props.showDate ? "ddd, MMM Do, HH:mm" : "HH:mm"
    return (
        <Fragment>
        {fixture && (
            <Grid container className={props.classes.root} >
                <Grid item xs={4}>
                    <Typography variant="subheading"  className={props.classes.right} >
                        <Link to={`/team/${fixture.home_team._id}`}>{fixture.home_team.club.title_short}</Link>
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.v}>
                    <Typography variant="caption" >
                        {(props.renderExtra && props.renderExtra()) || fixture.home_team.club.venue }<br/>
                        {moment(fixture.date).format(showDateTime)}
                        
                    </Typography>
                </Grid>
                <Grid item xs={4} className={props.classes.buttonContainer}>
                    <Typography variant="subheading"  className={props.classes.left} >
                        <Link to={`/team/${fixture.away_team._id}`}>{fixture.away_team.club.title_short}</Link>
                    </Typography>
                    <USER.Consumer>
                        {({user})=>{
                            return !props.shortForm && user.user && (user.user.isAdmin || user.user.isLeagueSecretary) && moment(fixture.date).isAfter()
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
        // marginTop:-10,
    },
    vicon:{
        height:28,
        width:28,

    }
})
export default withStyles(styles)(Fixture)  