import React, { Fragment } from 'react';
import {MoreVert, Favorite,Share } from '@material-ui/icons';
import { Card, CardContent, CardActions, CardHeader, Avatar, IconButton, ListItem, ListItemText, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const styles = theme=> ({
    root: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: red[500],
    },
    list:{
        maxHeight:200,
        overflow: 'auto',
    },
  });

const ClubsPanel = (props) => {
    let {classes, clubs=[], title} = props
    let clubList = clubs
                        .sort((a,b)=>{
                            if(a.title>b.title) return 1
                            else return -1
                        })
                        .map((club, key)=>(
                            <ListItem button key={key}>
                            <ListItemText primary={club.title} />
                            </ListItem>
                        ))
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar className={classes.avatar}>
                        C
                    </Avatar>
                    }
                    action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    }
                    title="Clubs"
                    subheader={"Clubs in the "+title}
                />
                <CardContent>                
                    <List component="nav" className={classes.list}>
                        {clubList}
                    </List>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <Share />
                    </IconButton>
                
                </CardActions>
            </Card>
        </Fragment>
    );
};

export default withStyles(styles)(ClubsPanel);