import React, { Component, Fragment } from 'react';
import Teams from '../teams/Teams'
import {Link, Route} from 'react-router-dom'
import ClubBanner from './ClubBanner'

import { LinearProgress, Paper } from '@material-ui/core';


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
        return (
            <div>
                {this.state.progressBar && <LinearProgress/>}
                <ClubBanner club={club} />
   
                    <Route path="/club/:club/teams/" component={Teams} exact={false} />
                    <Route path="/club/:club/" exact={true} component={()=>(
                        <Teams club={club}/>
                        // <b>OLD</b>
                    )} />
       
            </div>
        );
    }
}

export default Club;
