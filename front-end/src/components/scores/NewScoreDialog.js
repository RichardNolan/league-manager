import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, Typography, Grid, IconButton } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import {KeyboardArrowUp, KeyboardArrowDown} from '@material-ui/icons'
class NewScoreDialog extends React.Component {
state={
    _id:null,
    home: 0,
    away: 0,
}

onSave = ()=>{
    this.props.onSave(this.state)
    setTimeout(()=>this.setState({home:0, away:0, _id:null}), 1000)
}
changeScore(team, score){
    let newScore = this.state[team] + score
    newScore = newScore<0 ? 0 : newScore
    this.setState({[team]:newScore})
}

componentWillUpdate(nextProps, state){
    if(nextProps.fixture && nextProps.fixture._id!==this.state._id) {
        this.setState({
            _id:nextProps.fixture._id,
            home:nextProps.fixture.score_home||0,
            away:nextProps.fixture.score_away||0,
        })
    }
}

render(){
    let scoreboard = this.props.fixture 
        ?   (
                <Grid container>
                    <Grid item md={4} className={this.props.classes.team}>
                        <div><Typography variant='headline'>{this.props.fixture.home_team.club.title_short}</Typography></div>
                    </Grid>
                    <Grid item md={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton onClick={()=>this.changeScore('home', 1)}>
                                    <KeyboardArrowUp />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='headline' className={this.props.classes.score}>{this.state.home}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton onClick={()=>this.changeScore('home', -1)}>
                                    <KeyboardArrowDown />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={2}>
                        <Grid container>
                            <Grid item xs={12}>
                                <IconButton onClick={()=>this.changeScore('away', 1)}>
                                    <KeyboardArrowUp />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='headline' className={this.props.classes.score}>{this.state.away}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton onClick={()=>this.changeScore('away', -1)}>
                                    <KeyboardArrowDown />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={4} className={this.props.classes.team}>
                        <Typography variant='headline'>{this.props.fixture.away_team.club.title_short}</Typography>
                    </Grid>
                </Grid>
            )
        :   null
    return (       
        <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        >
        <DialogTitle>
            { this.props.fixture && this.props.fixture.division.league.title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                { this.props.fixture && this.props.fixture.division.title}
            </DialogContentText>
            {scoreboard}
        </DialogContent>
        <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={this.onSave} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>
    );
}
};


const styles = theme=>({
    root:{

    },
    score:{
        textAlign:'center',
    },
    team:{
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
    },
})

export default withStyles(styles)(NewScoreDialog);