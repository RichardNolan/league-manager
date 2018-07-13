import React from 'react';
import TableMain from './TableMain'
import {fetchQuery} from '../../utilities/fetch'
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
        let {teams, division} = this.props
        if(!teams && division){
            this.setState({progressBar:true})
            fetchQuery('http:localhost:9000/api/table/', {division})
                .then(res=>res.json())
                .then(teams=>{
                    this.setState({teams,progressBar:false})
                })
                .catch(err=>{
                    console.error(err)
                    this.setState({progressBar:false})
                })
        // }else if(teams){
        //     console.log("list of teams")
        //     if(teams[0] && typeof teams[0] === 'string'){
        //         // sent an array of teams
        //         // convert each el into an object with that el
        //         teams = teams.map(t=>({team:t}))
        //     }
        //     this.setState({teams})
        }
    }
    
    render(){
        let size = this.props.size ? ['tiny', 'small', 'medium', 'large', 'full'].indexOf(this.props.size) : 2
        return (
            <div className={this.props.classes.root}>
                <Paper>
                    {this.state.progressBar && <LinearProgress/>}
                    <Typography variant="headline" gutterBottom>
                        {this.props.title || null}
                        <TableMain size={size} teams={this.state.teams} />
                    </Typography>
                </Paper>
            </div>
        )
                
                
    }
};

export default withStyles(styles)(LeagueTable);