import React, { Fragment } from 'react';
import {getStandard} from '../../utilities/fetch'
import ClubBanner from '../clubs/ClubBanner'
import Fixture from '../fixtures/Fixture'
import FixtureSet from '../fixtures/FixtureSet'
import Result from '../results/Result'
import ResultSet from '../results/ResultSet'

import { LinearProgress, withStyles, Typography, Grid, Paper } from '@material-ui/core';
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
                team.table = team.table && team.table.table
                this.setState({team, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })

        fetch(`http://localhost:9000/api/fixture/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(fixtures=>{
                this.state && this.setState({fixtures, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })

        fetch(`http://localhost:9000/api/result/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(results=>{
                this.state && this.setState({results, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })
    }

    render(){ 
        let {team} = this.state
        let clubBanner = team && team.club && <ClubBanner club={team.club} />
        let nextFixture = (team && team.nextFixture && <Fixture fixture={team.nextFixture} showDate />) || null
        let fixtureHeading = (team && team.nextFixture && team.nextFixture.division && team.division && team.division.title) || 'None found'
        let lastResult = (team && team.lastResult && <Result result={team.lastResult} />) || null
        let resultHeading = (team && team.lastResult && team.lastResult.division && team.division && team.division.title) || 'None found'
        let leagueTable = (team && team.table && <LeagueTable division={team.division && team.division._id} filter={this.props.match ? null : team._id} />) || null
        // let tableHeading = team && team.lastResult && team.lastResult.division && team.division && team.division.title || 'None found'
        return (
            <Grid container className={this.props.classes.pad} spacing={16}>
                {!this.props.nobanner && clubBanner}

                <Grid item xs={12}>
                    <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                        {`League Table: ${resultHeading}`}
                    </Typography>
                    {leagueTable}
                </Grid>
                <Grid item xs={12}>
                    {this.state.progressBar && <LinearProgress/>}
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={12} md={6}>
                            <Paper>
                                {this.props.shortForm
                                    ?   <Fragment>
                                            <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                                                {`Next Fixture: ${fixtureHeading}`}
                                            </Typography>
                                            {nextFixture}
                                        </Fragment>
                                    :   <FixtureSet 
                                            title='Upcoming Fixtures'
                                            fixtures={this.state.fixtures} 
                                            showDate
                                        />
                                } 
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                                {this.props.shortForm
                                    ?   <Paper>
                                            <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                                                {`Last Result: ${resultHeading}`}
                                            </Typography>
                                            {lastResult}
                                        </Paper>
                                    :   <Paper>
                                            <ResultSet 
                                                title='Recent Results'
                                                results={this.state.results} 
                                            />
                                        </Paper>
                                } 
                        </Grid>
                    </Grid>

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
