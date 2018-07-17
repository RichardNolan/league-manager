import React from 'react';
import TableMain from './TableMain'
import {getStandard} from '../../utilities/fetch'
import { Paper, LinearProgress, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});

class LeagueTable extends React.Component {
    state = {
        teams:[],
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }
    
    fetchData(){
        this.setState({progressBar:true})
        fetch(`http://localhost:9000/api/division/5b47ccab658a78217440a3cc`, getStandard())
            .then(res=>res.json())
            .then(res=>{
                let leagueData = res.table.table
                                    .filter(t=>{                        
                                        if(this.props.filter) return this.props.filter===t.team ? true : false
                                        return true
                                    })

                leagueData.map(t=>{
                        t.team = res.teams.find(tm=>tm._id===t.team).club.title_short
                        return t
                    })
                this.setState({teams:leagueData,progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })
        // let {teams, division} = this.props
        // if(!teams && division){
        //     this.setState({progressBar:true})
        //     fetchQuery('http:localhost:9000/api/table/', {division})
        //         .then(res=>res.json())
        //         .then(teams=>{
        //             if(teams.error) throw(teams.message)
        //             this.setState({teams,progressBar:false})
        //         })
        //         .catch(err=>{
        //             console.error(err)
        //             this.setState({progressBar:false})
        //         })

        // }else if(teams){
        //     console.log("list of teams")
        //     if(teams[0] && typeof teams[0] === 'string'){
        //         // sent an array of teams
        //         // convert each el into an object with that el
        //         teams = teams.map(t=>({team:t}))
        //     }
        //     this.setState({teams})

        // }
    }

    render(){
        let size = this.props.size ? ['tiny', 'small', 'medium', 'large', 'full'].indexOf(this.props.size) : 2
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    {this.props.title || null}
                </Typography>
                {this.state.progressBar && <LinearProgress/>}
                <Paper className={this.props.classes.root}>
                        <TableMain size={size} teams={this.state.teams} />
                </Paper>
            </div>
        )
                
                
    }
};

export default withStyles(styles)(LeagueTable);