import React from 'react';

import Team from '../teams/Team';
import { Zoom, Grid, Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
const MemberHome = (props) => {
    return (
    <Grid container spacing={32}>
        <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
        <Grid item xs={12} sm={10} md={8} lg={6} > 

            <Zoom in={true} style={{ transitionDelay: 250 }}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>M</Avatar>
                    }
                    title="Member"
                    subheader="Members' Portal"
                />
                <CardContent>
                        <Typography variant='title' gutterBottom>
                            Welcome back {props.user.title || ''}
                        </Typography>
                        <Typography variant='subheading' gutterBottom>
                            Be sure to check out how your team is doing in the league...
                        </Typography>
                        <Team team={props.user.team}/>
                </CardContent>
            </Card>    
            </Zoom>
        </Grid>
        <Grid item xs={12} sm={2} md={2} ></Grid>
    </Grid>
    );
};

export default MemberHome;