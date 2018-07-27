import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField, Grid, Typography } from '@material-ui/core';
import TimeInput from 'material-ui-time-picker'
import SNACK from '../../SNACK'

import UserMenu from '../users/UserMenu';

class EditFixtureDialog extends Component {
    constructor(props){
        super(props)
        this.state={
            newFixtureDate: null,
            kickoff:null,
            referee:null,
        }
    }

    changeDate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    changeTime = kickoff=>{
        this.setState({kickoff})
    }

    changeReferee=(referee)=>{
        this.setState({referee})
    }

    save=()=>{
        let date = this.props.fixture && new Date(this.props.fixture.date)
        let day, month, formattedDate

        let hours = (this.state.kickoff && this.state.kickoff.getHours()) || date.getHours()
        hours = hours<10 ? "0"+hours.toString() : hours.toString()
        let minutes = (this.state.kickoff && this.state.kickoff.getMinutes().toString()) || date.getMinutes()
        minutes = minutes<10 ? "0"+minutes.toString() : minutes.toString()
        if(!this.state.newFixtureDate){
            day = date.getDate()
            day = day<10 ? "0"+day.toString() : day.toString()
            month = date.getMonth()+1
            month = month<10 ? "0"+month.toString() : month.toString()
            formattedDate = `${date.getFullYear()}-${month}-${day}`
        }else{
            formattedDate = this.state.newFixtureDate
        }

        let fullDate = formattedDate+" "+hours+":"+minutes
        this.setState({newFixtureDate:null,kickoff:null})
        this.props.onSave({date:fullDate, referee:this.state.referee})
    }

    render() { 
        
        let date = this.props.fixture && new Date(this.props.fixture.date)
        let day, month, formattedDate, defaultTime 

        if(date){
            day = date.getDate()
            day = day<10 ? "0"+day.toString() : day.toString()
            month = date.getMonth()+1
            month = month<10 ? "0"+month.toString() : month.toString()
            formattedDate = date ? `${date.getFullYear()}-${month}-${day}` : null

            defaultTime = date
        }
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle id="alert-dialog-title">Change the details for this fixture?</DialogTitle>
                <DialogContent>
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                defaultValue={formattedDate}
                                label="Reschedule Fixture"
                                type="date"
                                onChange={this.changeDate}
                                name="newFixtureDate"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Typography variant='caption'>
                                    Kick-off time
                            </Typography>
                            <TimeInput
                                mode='24h'
                                defaultValue={defaultTime}
                                onChange={kickoff=>this.changeTime(kickoff)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Typography variant='caption'>
                                    Referee
                            </Typography>
                            <UserMenu 
                                user='Referee'                                 
                                onChange={this.changeReferee}
                                default={(this.props.fixture && this.props.fixture.referee) || ''}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.save} color="primary" autoFocus>
                        Change Details
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

// export default EditFixtureDialog;
const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <EditFixtureDialog {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;