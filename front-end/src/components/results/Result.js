import React, { Fragment } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import EditIcon from '@material-ui/icons/Create';

import USER from '../../USER'
// import { relative, isAbsolute } from 'path';

const Result = (props) => {
    let {result} = props

    const openNewScoreDialog = ()=>{
        props.openNewScoreDialog(result)
    }

    return (
        <Fragment>
        {result && (
            <Grid container className={props.classes.root} >
                <Grid item xs={5}>
                    <Typography variant="subheading" >
                        {result.home_team.club.title_short}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={props.classes.score}>
                    <Typography variant="headline" >
                        {result.score_home } - {result.score_away}                        
                    </Typography>
                </Grid>
                <Grid item xs={5} className={props.classes.buttonContainer}>
                    <Typography variant="subheading" >
                        {result.away_team.club.title_short}
                    </Typography>
                    <USER.Consumer>
                        {({user})=>{
                            return user.user && (user.user.isAdmin || user.user.isLeagueSecretary)
                                ? (
                                    <IconButton color="primary" className={props.classes.editButton} onClick={openNewScoreDialog}>
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