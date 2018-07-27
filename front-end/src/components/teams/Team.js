import React, { Fragment } from 'react';
import {getStandard, DB_HOST} from '../../utilities/fetch'
import ClubBanner from '../clubs/ClubBanner'
import DivisionBanner from '../divisions/DivisionBanner'
import Fixture from '../fixtures/Fixture'
import FixtureSet from '../fixtures/FixtureSet'
import Result from '../results/Result'
import ResultSet from '../results/ResultSet'
import SNACK from '../../SNACK'
// import Division from '../divisions/Division'

import { LinearProgress, withStyles, Typography, Grid } from '@material-ui/core';
import LeagueTable from '../tables/LeagueTable';

class Team extends React.Component {
    state={
        id:this.props.team || (this.props.match && this.props.match.params.team) || (this.props.user && this.props.user.team),
        team:null,
        progressBar:false
    }

    componentDidMount(){
        this.state.id && this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})  
        fetch(`${DB_HOST}/api/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(team=>{
                team.table = team.table && team.table.table
                this.setState({team, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                this.props.showSnack(err)
            })

        fetch(`${DB_HOST}/api/fixture/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(fixtures=>{
                this.state && this.setState({fixtures, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                this.props.showSnack(err)
            })

        fetch(`${DB_HOST}/api/result/team/${this.state.id}`, getStandard())
            .then(res=>res.json())
            .then(results=>{
                this.state && this.setState({results, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                this.props.showSnack(err)
            })
    }

    render(){ 
        let {team} = this.state
        let {classes, ...rest} = this.props
        if(!this.state.id) return("You never selected your favourite team")

        let clubBanner = team && team.club && <ClubBanner club={team.club} team={team.title} />
        let divisionBanner = team && team.division && <DivisionBanner division={team.division} match={this.props.match} />
        let nextFixture = (team && team.nextFixture && <Fixture fixture={team.nextFixture} showDate {...rest}/>) || null
        let fixtureHeading = (team && team.nextFixture && team.nextFixture.division && team.division && team.division.title) || 'None found'
        let lastResult = (team && team.lastResult && <Result result={team.lastResult} showDate {...rest} />) || null
        let resultHeading = (team && team.lastResult && team.lastResult.division && team.division && team.division.title) || 'None found'
        let leagueTable = (team && team.table && <LeagueTable division={team.division && team.division._id} filter={this.props.match ? null : team._id} />) || null
        return (
            <Fragment>
                {!this.props.nobanner && clubBanner}
                {!this.props.nobanner && divisionBanner}
                                    
                <Grid container spacing={16} className={this.props.classes.root}>

                    <Grid item xs={12}>
                        {leagueTable}
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.progressBar && <LinearProgress/>}
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={12} md={6}>
                                    {this.props.shortForm
                                        ?   <Fragment>
                                                <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                                                    {`Next Fixture: ${fixtureHeading}`}
                                                </Typography>
                                                {nextFixture}
                                            </Fragment>
                                        :   <Fragment>
                                                <FixtureSet 
                                                    title='Upcoming Fixtures'
                                                    fixtures={this.state.fixtures} 
                                                    showDate
                                                />
                                            </Fragment>
                                    } 
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                    {this.props.shortForm
                                        ?   <Fragment>
                                                <Typography variant='subheading' gutterBottom className={this.props.classes.center}>
                                                    {`Last Result: ${resultHeading}`}
                                                </Typography>
                                                {lastResult}
                                            </Fragment>
                                        :   <Fragment>
                                                <ResultSet 
                                                    title='Recent Results'
                                                    results={this.state.results} 
                                                    showDate
                                                />
                                            </Fragment>
                                    } 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
};

const styles = theme=>({
    root:{
        padding:16,
    },
    center:{
        textAlign:'center',
    },
    headline:{        
        textAlign:'center',
        textDecoration:'none',
    },
})


// export default withStyles(styles)(Team);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Team {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);
