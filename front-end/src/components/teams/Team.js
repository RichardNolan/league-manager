import React from 'react';
import {getStandard} from '../../utilities/fetch'
import ClubBanner from '../clubs/ClubBanner'
class Team extends React.Component {
    state={
        id:this.props.team || this.props.match.params.team || (this.props.user && this.props.user.team),
        team:{}
    }
    componentDidMount(){
        fetch(`http://localhost:9000/api/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(team=>this.setState({team}))
            .catch(err=>console.log(err))
    }
    render(){ 
        let {team} = this.state
        let {club} = team && this.state.team

        return (
            <div>
                <ClubBanner club={club} />
                {this.state.id}
            </div>
        );
    }
};

export default Team;
