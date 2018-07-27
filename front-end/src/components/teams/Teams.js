import React, { Component, Fragment } from 'react';
import { post, fetchQuery, DB_HOST } from '../../utilities/fetch'
import { LinearProgress,  Avatar, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import {PlayArrow} from '@material-ui/icons'
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
            fetchQuery(DB_HOST+'/api/team', query  )
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
        // this.props.showSnack(body)
        fetch(DB_HOST+'/api/team', post(body))            
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
        // let {classes} = this.props
        
        let {teams} = this.state
        const {classes, ...rest} = this.props
        let teamPanels = teams && teams.length>0
                    ?   teams.map((team,key)=>(
                            <Fragment key={key}>
                                <AppBar position="static" color='default'>
                                    <Toolbar>
                                        <Avatar className={classes.avatar} >{((this.state.clubID && team.title) || (team.club && team.club.title_short)).charAt(0) }</Avatar>
                                        <Typography variant="title" color="inherit" className={this.props.classes.flex}>
                                            {/* If loaded from a club ID then use the team title otherwise use the club short title */}
                                            {(this.state.clubID && team.title) || (team.club && team.club.title_short) }
                                        </Typography>
                                        <IconButton component={Link} to={'/team/'+team._id}>
                                            <PlayArrow/>
                                        </IconButton>
                                    </Toolbar>
                                </AppBar>              
                                <Team team={team._id} key={key} nobanner shortForm />
                            </Fragment>                            
                        ))
                    :   null
                    
     
        return (
            <div className={classes.root}>
            {this.state.progressBar && <LinearProgress/>}

            {!this.props.nofab && <PlusFab 
                onSave={this.saveNewTeam.bind(this)} 
                dialog={TeamNewDialog} 
                {...rest}
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
    flex:{
        flexGrow:1,
    },
    avatar:{
        marginRight: theme.spacing.unit*2,
    }
})

// export default withStyles(styles)(Teams);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Teams {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);