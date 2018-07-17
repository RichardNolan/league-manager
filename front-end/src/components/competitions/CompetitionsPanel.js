import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
import {More, Favorite,Share, Add } from '@material-ui/icons';
import { Card, CardContent, CardActions, CardHeader, Avatar, IconButton, ListItem, ListItemText, List } from '@material-ui/core';


import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const CompetitionsPanel = (props) => {
    let {classes, competitions=[]} = props
    let competitionList = competitions
                        .sort((a,b)=>{
                            if(a.title>b.title) return 1
                            else return -1
                        })
                        .map((competition, key)=>(
                            <ListItem button key={key}>
                                <Link to={
                                    competition.type==='league' 
                                        ? `/organisations/${competition.organisation}/competitions/${competition._id}/league/` 
                                        : `/organisations/${competition.organisation}/competitions/${competition._id}/cup/`}  
                                    className={classes.nounderline}
                                    >
                                    <ListItemText primary={competition.title} />
                                </Link>
                            </ListItem>
                        ))
    return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>C</Avatar>
                    }
                    action={
                        <IconButton component={Link} to={'./competitions/'}>
                            <More />
                        </IconButton>
                    }
                    title="Competitions"
                    subheader={"Competitions being run"}
                />
                <CardContent>               
                    <List component="nav" className={classes.list}>
                        {competitionList}
                    </List>
                </CardContent>
                {/* <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton>
                        <Favorite />
                    </IconButton>
                    <IconButton>
                        <Share />
                    </IconButton>
                    <IconButton>
                        <Add />
                    </IconButton>
                
                </CardActions> */}
            </Card>
    );
};

const styles = {
    root: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: red[500],
    },
    list:{
        maxHeight:400,
        overflow: 'auto',
    },
    nounderline:{
        textDecoration:'none',
    },
  };

export default withStyles(styles)(CompetitionsPanel);