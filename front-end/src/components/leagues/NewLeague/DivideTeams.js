import React from 'react';
import { Grid, Paper, List, ListItem, ListItemText, LinearProgress, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import {fetchQuery, DB_HOST} from '../../../utilities/fetch'
import {Delete} from '@material-ui/icons'
import SNACK from '../../../SNACK'


class DivideTeams extends React.Component {
   state={
       divisions:this.props.divisionsObject, 
       progressBar:false,
       teams:[],
    //    teams:['Man utd', 'Arsenal', 'Spurs'],
   }

    allowDrag = (e)=> {
        e.preventDefault()
        e.target.style.backgroundColor = '#ddeedd'
    }
    hideDropStyles = e =>{
        e.target.style.backgroundColor = 'transparent'
        e.target.style.color = 'inherit'
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

    allowDelete = (e)=> {
        e.preventDefault()
        e.target.style.color = '#ff0000'
    }
    onDelete = e =>{
        e.preventDefault()
        let team =  e.dataTransfer.getData("text")

        this.hideDropStyles(e)
        let {divisions} = this.state
        for(let d in divisions){
            let index = divisions[d].findIndex(t=>t._id===team)
            if(index>-1) divisions[d].splice(index,1)
        }
        document.getElementById("teams-list").appendChild(document.getElementById(team))
    }

    onDrop = (e)=> {
        e.preventDefault()
        this.hideDropStyles(e)
        let team =  e.dataTransfer.getData("text")
        let division = e.target.id
        e.target.appendChild(document.getElementById(team))

        let {divisions} = this.state
        if(!divisions[division]) divisions[division] = []

        // REMOVES TEAM FROM PREVIOUS DIVISION IF MOVING
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
        this.fetchData(()=>{
        this.state.divisions &&
            Object.keys(this.state.divisions).forEach(d=>{
                this.state.divisions[d].forEach(t=>{
                    let division = document.getElementById(d)
                    let team = document.getElementById(t._id)
                    division.appendChild(team)
                })
            })

        })
        
    }

    fetchData=(cb)=>{       
        let org = (this.props.competition && this.props.competition.organisation) || null
        if(org){
            fetchQuery(DB_HOST+'/api/team', {organisation:org, category:this.props.competition.league.category})
                .then(res=>res.json())
                .then(res=>{
                    if(res.error) throw(res.message)
                    this.setState({teams:res}, ()=>{
                        cb()
                    })
                })
                .catch(err=>{
                    this.props.showSnack(err)
                })
        }
    }

render(){
    let {classes} = this.props

    let divisions = this.props.divisions 
        ?   this.props.divisions.map((division, key)=>{            
                return division.value
                    ?   (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                                <Paper className={classes.division}>
                                    <Typography variant='title'>
                                        {division.value}                                  
                                    </Typography>
                                  
                                    <List 
                                        className={classes.dropzone} 
                                        dense={true} 
                                        onDrop={this.onDrop} 
                                        onDragOver={this.allowDrag} 
                                        onDragLeave={this.hideDropStyles} 
                                        id={division.value}
                                    >
                                    </List>
                                </Paper>
                            </Grid>
                        )
                    : null
            })
        :   null


    let teams = this.state.teams.map((team, key)=>{
        return (
            
                <ListItem key={key} draggable={true} onDragStart={this.onDragStart} id={team._id} className={classes.team} >
                    {/* <ListItemText primary={team}/> */}
                    <ListItemText primary={team.club.title_short}/>
                </ListItem>
                )
        })
    return (
        <Grid container>
            {this.state.progressBar && <LinearProgress/>}
            <Grid item xs={12}>            
                <Grid container spacing={16} className={classes.divisions}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Paper className={classes.availableTeams}>
                        <Typography variant='caption'>
                            Available Teams                                 
                        </Typography>
                        <List dense={true} className={classes.teams} id="teams-list">
                            {teams}
                        </List>
                    </Paper>   
                    </Grid>
                    {divisions}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Delete 
                    onDrop={this.onDelete} 
                    onDragOver={this.allowDelete} 
                    onDragLeave={this.hideDropStyles} 
                    color="action" 
                    style={{ fontSize: 36 }} 
                    className={classes.delete}
                />
                <Typography variant='caption'>
                    Drag teams to the bin to remove them from a division.
                </Typography>
            </Grid>
        </Grid>
    );
}
};


const styles = (theme)=> ({
    root:{

    },
    divisions:{
        display:'flex',
        justifyContent:'flex-end'
    },
    division:{
        padding:theme.spacing.unit*2,
        width:'100%',
    },
    availableTeams:{
        backgroundColor: 'default',  
        padding:theme.spacing.unit*2,
        width:'100%',
    },
    dropzone:{
        width:'100%',
        height:200,
        backgroundColor: 'default',     
        overflow: 'auto',
        maxHeight: 300,
        paddingTop:40,
        '&:hover':{
            // backgroundColor:'yellow'
        }
    },
    teams:{        
        overflow: 'auto',
        maxHeight: 208,
    },
    team:{
        backgroundColor: theme.palette.background.default,
        cursor:'move',
    },
    delete:{
        
    '&:hover': {
        color: 'red',
      },
    }
})

// export default withStyles(styles)(DivideTeams);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <DivideTeams {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);