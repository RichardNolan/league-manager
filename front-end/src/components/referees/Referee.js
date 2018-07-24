import React, { Component } from 'react';
import {Grid,Card,CardHeader,Avatar,CardContent, Zoom, Typography} from '@material-ui/core'
import AwaitingScores from '../scores/AwaitingScores'
class Referee extends Component {
    render() {
        return ( <Grid container spacing={32}>
            <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} > 

            <Zoom in={true} style={{ transitionDelay: 250 }}>
               <Card>
                   <CardHeader
                       avatar={
                       <Avatar>
                           R
                       </Avatar>
                       }
                       title="Referee"
                       subheader="Referee's Portal"
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
            </Zoom>
            </Grid>
            <Grid item xs={12} sm={2} md={2} ></Grid>
        </Grid>
        );
    }
}

export default Referee;