import React from 'react';

import Team from '../teams/Team';
import {  Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
const MemberHome = (props) => {
    console.log(props.user.team)
    return (
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
    );
};

export default MemberHome;