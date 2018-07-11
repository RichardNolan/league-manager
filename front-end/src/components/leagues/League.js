import React from 'react';
import { getStandard } from '../../utilities/fetch'
import Divisions from '../divisions/Divisions';
import { LinearProgress } from '@material-ui/core';
class League extends React.Component {

    state={
        competitionID: this.props.competition || this.props.match.params.competition, 
        competition:null,
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})
        fetch(`http://localhost:9000/api/competition/${this.state.competitionID}`, getStandard())
            .then(res=>res.json())
            .then(competition=>{
                this.setState({competition,progressBar:false})
            })
            .catch(err=>{
                console.log(err)
                this.setState({progressBar:false})
            })
    }

    render(){ 
        let league = this.state.competition ? this.state.competition.league : null
        return (
            <div>
            {this.state.progressBar && <LinearProgress/>}    
                <h1>{league && league.title}</h1>
                {
                    league && league.divisions 
                        ?   <Divisions divisions={league.divisions} {...this.props}/>  
                        :   null 
                }
                {/* {league && <DivisionsContainer {...this.props} league={league} />} */}
            </div>
        );
    }
};

export default League;