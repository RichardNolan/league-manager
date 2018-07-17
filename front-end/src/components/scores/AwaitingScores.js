import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Button, Typography, CardContent, CardHeader, Card, Grid, Avatar } from '@material-ui/core';
import { fetchQuery, post } from '../../utilities/fetch';
import Fixture from '../fixtures/Fixture'
import NewScoreDialog from './NewScoreDialog';

class AwaitingScores extends Component {
    state = {
        organisation:  this.props.organisation || this.props.match.params.organisationID || this.props.match.params.organisation || (this.props.user && this.props.user.organisation),
        progressBar:false,
        fixtures:[],
        newScoreDialogOpen:false, 
        editFixture:null
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})
        fetchQuery('http://localhost:9000/api/awaitingscore', {})
            .then(res=>res.json())
            .then(fixtures=>{
                if(fixtures.error) throw(fixtures.message)
                this.setState({fixtures, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })
        }

    showDialog(fixture){
        this.setState({newScoreDialogOpen:true, editFixture:fixture})
    }
    closeNewScoreDialog(){
        this.setState({newScoreDialogOpen:false})
    }
    saveScore({home,away}){
        this.closeNewScoreDialog()
        let scores = {}
        this.props.user.isReferee && (scores.referee_home = home)
        this.props.user.isReferee && (scores.referee_away = away)

        this.props.user.isClubOfficial && (scores.club_official_home = home)
        this.props.user.isClubOfficial && (scores.club_official_away = away)

        this.props.user.isLeagueSecretary && (scores.score_home = home)
        this.props.user.isLeagueSecretary && (scores.score_away = away)
        this.props.user.isLeagueSecretary && (scores.status = 'result')

        let body = Object.assign({fixture:this.state.editFixture._id}, scores)
        fetch('http://localhost:9000/api/score', post(body))
            .then(res=>res.json())
            .then(res=>{
                console.log(res)
                this.fetchData()
            })
            .catch(err=>console.log(err))
    }
    render() {
        let fixtures = this.state.fixtures.map((fixture, index)=>(
                <Fixture 
                    fixture={fixture} 
                    key={index} 
                    showDate
                    renderExtra={()=>(
                        <Button color="primary" onClick={this.showDialog.bind(this,fixture)}>Score</Button>
                    )}
                />

        ))
        return (
            <div>   
            <Grid container spacing={32}>
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                <Grid item xs={12} sm={10} md={8} lg={6} > 


                   <Card>
                       <CardHeader
                           avatar={
                                <Avatar>S</Avatar>
                           }
                           title="Awaiting Scores"
                           subheader="These are fixtures which have been played but still haven't been given a final score"
                       />
                       <CardContent>
                            {this.state.progressBar && <LinearProgress/>}     
                            {
                                fixtures.length>0 
                                    ?  {fixtures}
                                    : <Typography variant='headline'>
                                        All played matches have been updated with a score
                                    </Typography>
                            }   
                        </CardContent>
                    </Card>
                </Grid>                
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
            </Grid>
            <NewScoreDialog 
                open={this.state.newScoreDialogOpen} 
                onClose={this.closeNewScoreDialog.bind(this)} 
                onSave={this.saveScore.bind(this)} 
                fixture={this.state.editFixture}
            />
            </div>
        );
    }
}

const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
})
export default withStyles(styles)(AwaitingScores);