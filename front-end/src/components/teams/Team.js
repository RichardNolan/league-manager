import React from 'react';
import {getStandard} from '../../utilities/fetch'
import ClubBanner from '../clubs/ClubBanner'
import Fixture from '../fixtures/Fixture'
import Result from '../results/Result'
import TableMain from '../tables/TableMain'

import { LinearProgress, withStyles, Paper, Typography, Grid } from '@material-ui/core';
import LeagueTable from '../tables/LeagueTable';

class Team extends React.Component {
    state={
        id:this.props.team || this.props.match.params.team || (this.props.user && this.props.user.team),
        team:null,
        progressBar:false
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})  
        fetch(`http://localhost:9000/api/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(team=>{
                team.table = team.table.table
                this.setState({team, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })
    }

    render(){ 
        let {team} = this.state
        let clubBanner = team && team.club && <ClubBanner club={team.club} />
        let nextFixture = team && team.nextFixture && <Fixture fixture={team.nextFixture} showDate /> || null
        let fixtureHeading = team && team.nextFixture && team.nextFixture.division && team.division && team.division.title || 'None found'
        let lastResult = team && team.lastResult && <Result result={team.lastResult} /> || null
        let resultHeading = team && team.lastResult && team.lastResult.division && team.division && team.division.title || 'None found'
        let leagueTable = team && team.table && <LeagueTable division={team.division && team.division._id} filter={this.props.match ? null : team._id} /> || null
        // let tableHeading = team && team.lastResult && team.lastResult.division && team.division && team.division.title || 'None found'
        return (
            <Grid container className={this.props.classes.pad} spacing={16}>
                {!this.props.nobanner && clubBanner}
                <Grid item xs={12}>
                    {this.state.progressBar && <LinearProgress/>}
                    <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                        {`Next Fixture: ${fixtureHeading}`}
                    </Typography>
                    {nextFixture}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                        {`Last Result: ${resultHeading}`}
                    </Typography>
                    {lastResult}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                        {`League Table: ${resultHeading}`}
                    </Typography>
                    {leagueTable}
                </Grid>
            </Grid>
        );
    }
};

const styles = theme=>({
    pad:{
        // padding:theme.spacing.unit*2,
        // margin:theme.spacing.unit*2,
    },
    center:{
        textAlign:'center',
    },
})


export default withStyles(styles)(Team);
