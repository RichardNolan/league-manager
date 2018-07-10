import React from 'react';
import { Grid, Paper, List, ListItem, ListItemText, LinearProgress } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import {fetchQuery} from '../../../utilities/fetch'
const styles = (theme)=> ({
    root:{

    },
    division:{
        padding:theme.spacing.unit*2,
        width:200,
    },
    dropzone:{
        width:'100%',
        height:200,
        backgroundColor: 'default',     
        overflow: 'auto',
        maxHeight: 300,
    },
    teams:{        
        overflow: 'auto',
        maxHeight: 300,
    },
    team:{
        backgroundColor: theme.palette.background.default,
    },
})

class DivideTeams extends React.Component {
   state={
       divisions:this.props.divisionsObject, 
       progressBar:false,
       teams:[],
   }

    allowDrag = (e)=> {
        e.preventDefault()
    }
    
    onDragStart = (e)=> {
        e.dataTransfer.setData("text", e.target.id)
    }
    
    lookup = id=> {
        if(this.state.teams) {
            let selectedTeam = this.state.teams.filter(team=>team._id===id)
            if(selectedTeam.length===1 && selectedTeam[0].title) return selectedTeam[0].club.title_short
        }
        return ''
    }

    onDrop = (e)=> {
        e.preventDefault()
        let team =  e.dataTransfer.getData("text")
        let division = e.target.id
        console.log(division, team)
        e.target.appendChild(document.getElementById(team))
        let {divisions} = this.state
        if(!divisions[division]) divisions[division] = []
        // TO-DO REMOVE TEAM FROM ALL ARRAYS BEFORE PROCEEDING OTHERWISE IF MOVING FROM ONE DIVISION TO ANOTHER THAT TEAM IS IN BOTH
for(let d in divisions){
    let index = divisions[d].findIndex(t=>t._id===team)
    if(index>-1) divisions[d].splice(index,1)
}
        let teamObj = {_id:team, title:this.lookup(team)}
        divisions[division].push(teamObj)

        this.setState({divisions})        
        this.props.onChange('divisionsObject', divisions) 
    }

    componentDidMount(){
       // TO-DO going back and adding another division wipes this 
        let {divisions} = this.state
        console.log(this.props)
        let org = (this.props.competition && this.props.competition.organisation) || null
        if(org){
            fetchQuery('http://localhost:9000/api/team', {organisation:org, category:this.props.competition.league.category})
                .then(res=>res.json())
                .then(res=>{
                    this.setState({teams:res})
                })
                .catch(err=>{
                    console.log(err)
                })
        }

        // THIS LOADS DIVISIONS ON BACK - NEEDS TO BE RE-JIGGED AS TEAMS ARE NOT A STRING NOW
        // if(divisions){
        //     for(let division in divisions){
        //         for(let team in divisions[division]){
        //             document.getElementById(division).appendChild(document.getElementById(divisions[division][team]))
        //         }
        //     }
        // }

    }

render(){
    let {classes} = this.props

    let divisions = this.props.divisions 
        ?   this.props.divisions.map((division, key)=>{            
                return division.value
                    ?   (
                            <Grid item key={key}>
                                <Paper className={classes.division}>
                                    {division.value}
                                  
                                    <List className={classes.dropzone} dense={true} onDrop={this.onDrop} onDragOver={this.allowDrag} id={division.value}>
                                    </List>
                                </Paper>
                            </Grid>
                        )
                    : null
            })
        :   null


    let teams = this.state.teams.map((team, key)=>{
        return (
                <ListItem key={key} draggable={true} onDragStart={this.onDragStart} id={team._id} className={classes.team}>
                    <ListItemText primary={team.club.title_short}/>
                </ListItem>
                )
        })
    return (
        <Grid container>
            {this.state.progressBar && <LinearProgress/>}
            <Grid item md>
                <Grid container spacing={16}>
                    {divisions}
                </Grid>
            </Grid>
            <Grid item md>    
                <List dense={true} className={classes.teams}>
                  {teams}
                </List>
            </Grid>
        </Grid>
    );
}
};

export default withStyles(styles)(DivideTeams);