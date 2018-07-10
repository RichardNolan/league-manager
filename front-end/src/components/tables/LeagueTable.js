import React from 'react';
import TableMain from './TableMain'
import {fetchQuery} from '../../utilities/fetch'
import { Paper, LinearProgress, Typography } from '@material-ui/core';
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
            fetchQuery('http:localhost:9000/api/table', {division})
                .then(result=>this.setState({teams:result,progressBar:false}))
                .catch(err=>{
                    console.log(err)
                    this.setState({progressBar:false})
                })
        }else if(teams){
            if(teams[0] && typeof teams[0] === 'string'){
                // sent an array of teams
                // convert each el into an object with that el
                teams = teams.map(t=>({team:t}))
            }
            this.setState({teams})
        }
    }
    
    render(){
        let size = this.props.size ? ['tiny', 'small', 'medium', 'large', 'full'].indexOf(this.props.size) : 2
        return (
            <Paper className={this.props.classes.root}>
                {this.state.progressBar && <LinearProgress/>}
                <Typography variant="headline" gutterBottom>
                    {this.props.title || null}
                </Typography>
                <TableMain size={size} teams={this.state.teams} />
            </Paper>
        );
    }
};

export default withStyles(styles)(LeagueTable);