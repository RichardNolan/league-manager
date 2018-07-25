import React, { Component } from 'react';
import {Card,CardHeader,Avatar,CardContent, Typography} from '@material-ui/core'
import AwaitingScores from '../scores/AwaitingScores'
class ClubOfficial extends Component {
    render() {
        return ( 
               <Card>
                   <CardHeader
                       avatar={
                       <Avatar>
                           C
                       </Avatar>
                       }
                       title="Club Official"
                       subheader="Club Official's Portal"
                   />
                   <CardContent>
                        <Typography variant='title' gutterBottom>
                            Welcome back {this.props.user.title || ''}
                        </Typography>
                        <Typography variant='subheading' gutterBottom>
                            Be sure to update any of your past results...
                        </Typography>
                        <AwaitingScores {...this.props} />
                   </CardContent>
               </Card> 
        );
    }
}

export default ClubOfficial;