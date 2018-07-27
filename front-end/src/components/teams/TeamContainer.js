import React, { Component } from 'react';
import Team from './Team'
import SNACK from '../../SNACK'

import { getStandard, DB_HOST } from '../../utilities/fetch'

class TeamContainer extends Component {
    state ={
        team:{}
    }
    componentDidMount(){
        this.getTeamDetails()
    }
    getTeamDetails(){
        fetch(`${DB_HOST}/api/team/${this.props.match.params.id}`, getStandard())
            .then(res=>res.json())
            .then(team=>{
                this.setState({team})
            })
            .catch(err=>this.props.showSnack(err))
    }
    render() {
        return <Team {...this.props} team={this.state.team} />
    }
}

// export default TeamContainer;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <TeamContainer {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;