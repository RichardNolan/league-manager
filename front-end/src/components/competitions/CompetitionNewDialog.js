import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Grid, FormControlLabel, Switch } from '@material-ui/core';

class CompetitionNewDialog extends React.Component {
state={
    title:'',
    isLeague:true,
    isCup:false,
}
changeTitle=(e)=>{
    this.setState({title:e.target.value})
}
onSave = ()=>{
    this.props.onSave(this.state)
    this.setState({title:'', isLeague:true, isCup:false})
}
changeSwitch=(e)=>{
    let type = e.target.checked ? Object.assign({
            isLeague:false,
            isCup:false
        }, {[e.target.name]:e.target.checked}
    ) : {[e.target.name]:e.target.checked}
    this.setState(type)
}
render(){
    return (       
        <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        >
        <DialogTitle>
            Create a new Competition
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please provide a name title for the Competition you wish to add.
            </DialogContentText>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            label="Competition Title"
                            type="text"
                            value={this.state.title}
                            onChange={this.changeTitle}
                        />
                    </Grid>
                </Grid>
            <Grid container>
                <Grid item xs={6}>
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isLeague}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isLeague'
                            />
                        }
                        label="League Competition"
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isCup}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isCup'
                            />
                        }
                        label="Cup Competition"
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

export default CompetitionNewDialog;