import React from 'react';
import { getStandard } from '../../utilities/fetch'
import Divisions from '../divisions/Divisions';
import { LinearProgress, withStyles } from '@material-ui/core';
import SNACK from '../../SNACK'

class League extends React.Component {

    state={
        competitionID: this.props.competition || this.props.match.params.competition || null, 
        leagueID: this.props.league || this.props.match.params.league || null, 
        competition:null,
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})

        let url = `http://localhost:9000/api/`
        if(this.state.competitionID) url += `competition/${this.state.competitionID}`
        else if(this.state.leagueID) url += `league/${this.state.leagueID}`

        fetch(url, getStandard())
            .then(res=>res.json())
            .then(res=>{
                let competition = {}
                if(!this.state.competitionID && this.state.leagueID) competition.league = res
                else competition = res
            
                this.setState({competition,progressBar:false})
            })
            .catch(err=>{
                this.props.showSnack(err)
                this.setState({progressBar:false})
            })
    }

    render(){ 
        let league = this.state.competition ? this.state.competition.league : null
        return (
            <div className={this.props.classes.root}>
            {this.state.progressBar && <LinearProgress/>}    
                <h1>{league && league.title}</h1>
                {
                    league && league.divisions 
                        ?   <Divisions divisions={league.divisions} {...this.props}/>  
                        :   null 
                }
            </div>
        );
    }
};


const styles = theme=>({
    root:{
        padding:theme.spacing.unit*2,

    },
})


// export default League;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <League {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);