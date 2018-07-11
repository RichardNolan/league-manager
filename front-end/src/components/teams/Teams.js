import React, { Component } from 'react';
import { post, fetchQuery } from '../../utilities/fetch'
import { Button,Grid, LinearProgress} from '@material-ui/core';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TeamNewDialog from './TeamNewDialog';
import PlusFab from '../PlusFab';
import Snack from '../Snack';


const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
})

class Teams extends Component {
    state={
        teams: this.props.teams || [],
        progressBar:false,
        clubID: (this.props.club && this.props.club._id) || (this.props.match && this.props.match.params.club) || null,
    }
    
    componentDidMount(){
        this.fetchData()
    }
    
    saveNewTeam = (newTeam)=>{
        this.setState({progressBar:true})   
        let body = {
            title: newTeam.title,
            category: newTeam.category,
            club: this.state.clubID || newTeam.club,   // TO-DO I THINK THE ID IS NEEDED NOW
            organisation: (this.props.club && this.props.club.organisation) || (this.props.user && this.props.user.organisation),
        }
        console.log(body)
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
                console.log(err)
                this.setState({snackOpen:true, snackMessage:err.message,progressBar:false})  
            })
    }

    fetchData(){   
        this.setState({progressBar:true})   
        let query = this.props.division 
            ? {division: this.props.division} 
            : (this.state.clubID 
                    ? {club:this.state.clubID || (this.state.club && this.state.club._id)} 
                    : null
              )
        
        fetchQuery('http://localhost:9000/api/team', query  )
            .then(res=>res.json())
            .then(res=>{
                let result = {teams:res, progressBar:false}
                if(res.length===0) this.setState(Object.assign(result, {snackOpen:true, snackMessage:'No results found'}))
                else this.setState(result)  
            })
            .catch(err=>{
                console.error(err)  
                this.setState({snackOpen:true, snackMessage:err.message,progressBar:false})
            })
    }

    render() {
        let {classes} = this.props
        
        let {teams} = this.state
        let teamsMetro = teams && teams.length>0
                    ?   teams.map((team,key)=>(
                            <Button component={Link} to={'/team/'+team._id} key={key}>
                                {/* If loaded from a club ID then use the team title otherwise use the club short title */}
                                {(this.state.clubID && team.title) || (team.club && team.club.title_short) }
                            </Button>
                        ))
                    :   null
                    
     
        return (
            <div className={classes.root}>
            {this.state.progressBar && <LinearProgress/>}

            <PlusFab 
                onSave={this.saveNewTeam.bind(this)} 
                dialog={TeamNewDialog} 
                {...this.props}
            />   
               
            <Grid container>
                <Grid item>   
                   <p>This will be done as metro style tiles. </p>
                   {teamsMetro}
                </Grid>
            </Grid>
            <Snack open={this.state.snackOpen} message={this.state.snackMessage} onClose={()=>this.setState({snackOpen:false})} />
        </div>
        );
    }
}

export default withStyles(styles)(Teams);