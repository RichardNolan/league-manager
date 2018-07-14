import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField, Grid, Typography } from '@material-ui/core';
import TimeInput from 'material-ui-time-picker'

class EditFixtureDialog extends Component {
    constructor(props){
        super(props)

     

        this.state={
            newFixtureDate: null,
            kickoff:null,
        }
    }
    changeDate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    changeTime = kickoff=>{
        this.setState({kickoff})
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
        this.props.onSave(fullDate)
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
                <DialogTitle id="alert-dialog-title">Are you sure you want to log out?</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                            <Typography variant='caption'>
                                    Kick-off time
                            </Typography>
                            <TimeInput
                                mode='24h'
                                defaultValue={defaultTime}
                                onChange={kickoff=>this.changeTime(kickoff)}
                            />
                    </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.save} color="primary" autoFocus>
                    Change Fixture Date
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditFixtureDialog;