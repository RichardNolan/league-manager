import React, { Component, Fragment } from 'react';
import Teams from '../teams/Teams'
import {Link, Route} from 'react-router-dom'
import ClubBanner from './ClubBanner'

import { LinearProgress } from '@material-ui/core';


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
                
                <Link 
                    to={`${this.props.location.pathname}/teams/`}  
                    from={this.props.location.pathname}
                >
                    Teams
                </Link>

                <Route path="/club/:club/teams/" component={Teams} exact={false} />
                <Route exact path="/club/:club/" exact={true} component={()=>(
                    <Fragment>
                        {/* <Teams param={{club:this.props.match.params.id}} club={this.state.club}/> */}
                        this is the home page
                    </Fragment>
                )} />
            </div>
        );
    }
}

export default Club;
