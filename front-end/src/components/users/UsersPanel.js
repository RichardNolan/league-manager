import React, { Fragment } from 'react';
import {MoreVert, Favorite,Share } from '@material-ui/icons';
import { Card, CardContent, CardActions, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Users from './Users'

const UsersPanel = (props) => {
    let {classes} = props
    // let organisation = props.organisation
    // let userList = list
    //                     .sort((a,b)=>{
    //                         if(a.title>b.title) return 1
    //                         else return -1
    //                     })
                       
    return (
        <Fragment>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar className={classes.avatar}>
                        U
                    </Avatar>
                    }
                    action={
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    }
                    title="Users"
                    subheader={"Competitions being run by "+props.title}
                />
                <CardContent>
                <Users {...props}/>
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
export default withStyles(styles)(UsersPanel);