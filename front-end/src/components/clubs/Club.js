import React, { Component, Fragment } from 'react';
import Teams from '../teams/Teams'
import {Link, Route} from 'react-router-dom'
import ClubBanner from './ClubBanner'

import { Grid, LinearProgress, CardHeader, CardContent, Card, Avatar, withStyles } from '@material-ui/core';


class Club extends Component {
    state={
        id: this.props.club || this.props.match.params.club || (this.props.user && this.props.user.club) ,
        club:{},
        progressBar:false
    }
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){  
        this.setState({progressBar:true})     
        fetch('http://localhost:9000/api/club/'+this.state.id)
            .then(res=>res.json())
            .then(res=>{
                this.setState({club:res,progressBar:false})
            })
            .catch(err=>{
                console.log(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        let {club} = this.state
        let {classes} = this.props
        return (
            <div>
                {this.state.progressBar && <LinearProgress/>}
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                                <Grid item xs={12} sm={10} md={8} lg={6} > 
                                    <Card>
                                    <ClubBanner club={club} />
                                        <CardContent spacing={16} className={classes.nopadding}>                                         
                        
                                            <Route path="/club/:club/teams/" component={Teams} exact={false} />
                                            <Route path="/club/:club/" exact={true} component={()=>(
                                                <Teams club={club}/>
                                            )} />                    
                                        </CardContent>
                                    </Card>
                                </Grid>                
                                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                            </Grid>
       
            </div>
        );
    }
}

const styles = (theme)=>( {
    nopadding:{
        padding:0,
    },
})

export default withStyles(styles)(Club)

