import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { LinearProgress, Button, Typography, CardContent, CardHeader, Card, Avatar } from '@material-ui/core';
import { fetchQuery, post, DB_HOST } from '../../utilities/fetch';
import Fixture from '../fixtures/Fixture'
import NewScoreDialog from './NewScoreDialog';
import SNACK from '../../SNACK'

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
        fetchQuery(DB_HOST+'/api/awaitingscore', {})
            .then(res=>res.json())
            .then(fixtures=>{
                if(fixtures && fixtures.error) throw(fixtures.message)
                this.setState({fixtures, progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                this.props.showSnack(err)
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
        fetch(DB_HOST+'/api/score', post(body))
            .then(res=>res.json())
            .then(res=>{
                this.fetchData()
            })
            .catch(err=>this.props.showSnack(err))
    }
    render() {
        return (
            <Fragment>  
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
                                this.state.fixtures.length>0 
                                    ?  this.state.fixtures.map((fixture, index)=>(
                                        <Fixture 
                                            fixture={fixture} 
                                            key={index} 
                                            showDate
                                            renderExtra={()=>(
                                                <Button color="primary" onClick={this.showDialog.bind(this,fixture)}>Score</Button>
                                            )}
                                        />                            
                                        ))
                                    :   <Typography variant='headline'>
                                            All played matches have been updated with a score
                                        </Typography>
                            }   
                        </CardContent>
                    </Card>
            <NewScoreDialog 
                open={this.state.newScoreDialogOpen} 
                onClose={this.closeNewScoreDialog.bind(this)} 
                onSave={this.saveScore.bind(this)} 
                fixture={this.state.editFixture}
            />
            </Fragment>
        );
    }
}

const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
})
// export default withStyles(styles)(AwaitingScores);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <AwaitingScores {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);