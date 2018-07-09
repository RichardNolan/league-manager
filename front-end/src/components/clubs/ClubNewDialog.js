import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Grid } from '@material-ui/core';

class ClubNewDialog extends React.Component {
state={
    title:'',
}
handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
onSave = ()=>{
    this.props.onSave(this.state)
    this.setState({title:''})
}

render(){
    return (       
        <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        >
        <DialogTitle>
            Create a new Club
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please provide a name title for the Club you wish to add.
            </DialogContentText>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="Club Title"
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name='title'
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

export default ClubNewDialog;