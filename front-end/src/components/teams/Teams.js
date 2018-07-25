import React, { Component } from 'react';
import { post, fetchQuery } from '../../utilities/fetch'
import { Button, LinearProgress, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TeamNewDialog from './TeamNewDialog';
import PlusFab from '../PlusFab';
import Snack from '../Snack';
import Team from './Team';
import SNACK from '../../SNACK'

class Teams extends Component {
    state={
        teams: this.props.teams || [],
        progressBar:false,
        clubID: (this.props.club && this.props.club._id) || (this.props.match && this.props.match.params.club) || null,
    }
    
    componentDidMount(){
        this.fetchData()
    }
    

    fetchData(){   
        let query = this.props.division 
            ? {division: this.props.division} 
            : (this.state.clubID 
                    ? {club:this.state.clubID || (this.state.club && this.state.club._id)} 
                    : null
              )
        // TO-DO probably build this into the function call for pagination particularly for results and fixtures
        // query.limit = 10
        // query.skip = 5
        if(query){
            this.setState({progressBar:true})   
            fetchQuery('http://localhost:9000/api/team', query  )
                .then(res=>res.json())
                .then(res=>{
                    if(res.error) throw(res.message)
                    let result = {teams:res, progressBar:false}
                    if(res.length===0) this.setState(Object.assign(result, {snackOpen:true, snackMessage:'No results found'}))
                    else {
                        this.setState(result)
                        if(this.props.returnTeams && typeof this.props.returnTeams === 'function') this.props.returnTeams(res)
                    }
                })
                .catch(err=>{
                    console.error(err)  
                    this.setState({snackOpen:true, snackMessage:err.message,progressBar:false})
                })
        }
    }

    saveNewTeam = (newTeam)=>{
        this.setState({progressBar:true})   
        let body = {
            title: newTeam.title,
            category: newTeam.category,
            club: this.state.clubID || newTeam.club,   // TO-DO I THINK THE ID IS NEEDED NOW
            organisation: (this.props.club && this.props.club.organisation) || (this.props.user && this.props.user.organisation),
        }
        this.props.showSnack(body)
        fetch('http://localhost:9000/api/team', post(body))            
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                let teams = [...this.state.teams]
                teams.push(res)         
                this.setState({teams, team_title:res.title})    
                this.setState({progressBar:false})                 
            })
            .catch(err=>{
                this.props.showSnack(err)
                this.setState({snackOpen:true, snackMessage:err.message,progressBar:false})  
            })
    }
    render() {
        let {classes} = this.props
        
        let {teams} = this.state
        let teamPanels = teams && teams.length>0
                    ?   teams.map((team,key)=>(
                        <Paper key={key}>
                            <Button component={Link} to={'/team/'+team._id} variant='contained' color='primary' className={this.props.classes.fullWidth}>
                                {/* If loaded from a club ID then use the team title otherwise use the club short title */}
                                {(this.state.clubID && team.title) || (team.club && team.club.title_short) }
                            </Button>
                            <Team team={team._id} key={key} nobanner shortForm />
                        </Paper>
                            
                        ))
                    :   null
                    
     
        return (
            <div className={classes.root}>
            {this.state.progressBar && <LinearProgress/>}

            {!this.props.nofab && <PlusFab 
                onSave={this.saveNewTeam.bind(this)} 
                dialog={TeamNewDialog} 
                {...this.props}
            />   }
               
            {teamPanels}
                
            <Snack open={this.state.snackOpen} message={this.state.snackMessage} onClose={()=>this.setState({snackOpen:false})} />
        </div>
        );
    }
}


const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
    fullWidth:{
        width:'100%',
    },
})

// export default withStyles(styles)(Teams);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Teams {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);