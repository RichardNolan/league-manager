import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, TextField } from '@material-ui/core';

class EditFixtureDialog extends Component {
    state={
        newFixtureDate: null
    }
    changeDate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    save=()=>{
        this.props.onSave(this.state.newFixtureDate)
    }
    render() {
        let date = this.props.fixture && new Date(this.props.fixture.date)
        let month, formattedDate 
        if(date){
            month = date.getMonth()+1
            month = month<10 ? "0"+month.toString() : month.toString()
            formattedDate = date ? `${date.getFullYear()}-${month}-${date.getDate()}` : null
        }
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <DialogTitle id="alert-dialog-title">Are you sure you want to log out?</DialogTitle>
                <DialogContent>

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