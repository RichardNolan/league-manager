import React, { Component } from 'react';
import Teams from '../teams/Teams'

import { LinearProgress } from '@material-ui/core';


class Club extends Component {
    state={
        club:{},
        progressBar:false
    }
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){  
        this.setState({progressBar:true})     
        fetch('http://localhost:9000/api/club/'+this.props.match.params.id)
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
        let clubName = this.state.club && (this.state.club.title || null)
        let clubCrest = this.state.club && this.state.club.crest && (<img src={this.state.club.crest} style={{width:'100px'}} /> || null)
        return (
            <div>
                {this.state.progressBar && <LinearProgress/>}
                <h1>{clubName}</h1>
{clubCrest}
                <Teams param={{club:this.props.match.params.id}} club={this.state.club}/>
            </div>
        );
    }
}

export default Club;
