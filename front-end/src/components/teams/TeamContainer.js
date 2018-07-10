import React, { Component } from 'react';
import Team from './Team'

import fetchQuery, { getStandard } from '../../utilities/fetch'

class TeamContainer extends Component {
    state ={
        team:{}
    }
    componentDidMount(){
        this.getTeamDetails()
        // this.getLeagueTable()
        // this.getFixtures()
        // this.getResults()
    }
    getTeamDetails(){
        fetch(`http://localhost:9000/api/team/${this.props.match.params.id}`, getStandard())
            .then(res=>res.json())
            .then(team=>{
                this.setState({team})
            })
            .catch(err=>console.log(err))
    }
    render() {
        return (
            <div>
                <Team {...this.props} team={this.state.team} />
            </div>
        );
    }
}

export default TeamContainer;