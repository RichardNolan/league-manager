import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Tooltip, FormControlLabel, Switch, Grid, withStyles, Typography } from '@material-ui/core';
import TimeInput from 'material-ui-time-picker'
import SNACK from '../../SNACK'

import { fetchQuery } from '../../utilities/fetch';
// import Teams from '../teams/Teams'
import LeagueTable from '../tables/LeagueTable'
class FixturesNewDialog extends React.Component {
state={
    title:'',
    teams:[],
    two_legs:true,
    random:true,
    season_start: null,
    season_end: null,
    division:this.props.division,
    kickoff: null
}
onSave = ()=>{
    let kickoff = this.state.kickoff.getHours()+":"+this.state.kickoff.getMinutes()
    let start = this.state.season_start+" "+kickoff
    let end = this.state.season_end+" "+kickoff
    this.setState({season_start:start, season_end:end}, ()=>{
        this.props.onSave(this.state)
    })
    // this.setState({title:''})
}
changeDate=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
changeSwitch = (e)=>{
    this.setState({[e.target.name]: e.target.checked})
}
changeTime = kickoff=>{
    this.setState({kickoff})
}
componentDidMount(){
    this.fetchData()
}

fetchData = ()=>{    
    let defaultTime = new Date()
    defaultTime.setHours(11)
    defaultTime.setMinutes(30)
    this.setState({kickoff:defaultTime})

    let {division} = this.props
    fetchQuery('http://localhost:9000/api/team', {division})
        .then(res=>res.json())
        .then(teams=>{
            if(teams.error) throw(teams.message)
            this.setState({teams})
        })
        .catch(err=>this.props.showSnack(err))
}
render(){
    let {classes} = this.props
    return (       
        <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
        >
        <DialogTitle>
            Create a new Fixture List
        </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={12} >
                    <DialogContentText>
                        This will create a new fixture list for the teams in this division, this will not replace any existing fixtures, rather merge them.
                    </DialogContentText>
                </Grid>
                {/* <Grid item xs={12} >
                    <Paper className={classes.space}>
                        <Grid container>
                            <Teams division={this.props.division} nofab />
                        </Grid>
                    </Paper>
                </Grid> */}
                <Grid item xs={12} className={classes.space}>
                    <LeagueTable  division={this.props.division} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Season Start Date"
                        type="date"
                        onChange={this.changeDate}
                        name="season_start"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Season End Date"
                        type="date"
                        onChange={this.changeDate}
                        name="season_end"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                <Typography variant='caption'>
                        Kick-off time
                </Typography>
                <TimeInput
                    mode='24h'
                    value={this.state.kickoff}
                    onChange={kickoff=>this.changeTime(kickoff)}
                    className={this.props.classes.timeControl}
                />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControlLabel control={
                        <Tooltip id="tooltip-icon" title="Create both Home and Away fixtures?">
                            <Switch
                                checked={this.state.two_legs}
                                onChange={this.changeSwitch}
                                color="primary"
                                name="two_legs"
                            />
                        </Tooltip>
                        }
                        label="Home and Away legs"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControlLabel control={
                        <Tooltip id="tooltip-icon" title="Shuffle up the teams before creating the list?">
                            <Switch
                                checked={this.state.random}
                                onChange={this.changeSwitch}
                                color="primary"
                                name="random"
                            />
                        </Tooltip>
                        }
                        label="Shuffle teams"
                    />
                </Grid>
            </Grid>
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

const styles = (theme)=>({
    root:{

    },
    space: {
        // padding: theme.spacing.unit*2,
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    },
    FAB:{
        
    },
    timeControl:{
        // marginTop:
    },
    fullWidth:{}
})

// export default withStyles(styles)(FixturesNewDialog);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <FixturesNewDialog {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);