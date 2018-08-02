import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
import { More } from '@material-ui/icons';
import { Card, CardContent, CardHeader, Avatar, IconButton, ListItem, ListItemText, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const ClubsPanel = (props) => {
    let {classes, clubs=[], title} = props
    let clubList = clubs
                        .sort((a,b)=>{
                            if(a.title>b.title) return 1
                            else return -1
                        })
                        .map((club, key)=>(
                            <ListItem button key={key}>
                                <Link to={`/club/${club._id}`} className={classes.nounderline}>
                                    <ListItemText primary={club.title} />
                                </Link>
                            </ListItem>
                        ))
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>C</Avatar>
                    }
                    action={
                        <IconButton component={Link} to={`/organisations/${props.organisation._id}/clubs/`}>
                            <More />
                        </IconButton>
                    }
                    title="Clubs"
                    subheader={"Clubs in the "+props.organisation.title}
                />
                <CardContent>                
                    <List component="nav" className={classes.list}>
                        {clubList}
                    </List>
                </CardContent>
            </Card>
        </Fragment>
    );
};

const styles = theme=> ({
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
  });

export default withStyles(styles)(ClubsPanel);