import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Grid } from '@material-ui/core';

class ClubNewDialog extends React.Component {
state={
    title:'',
    title_short:'',
    primary_color:'#0080c0',
    secondary_color:'#fffa8c',
    crest:'',
}
handleChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
onSave = ()=>{
    this.props.onSave(this.state)
    this.setState({
        title:'',
        title_short:'',
        primary_color:'#0080c0',
        secondary_color:'#fffa8c',
        crest:'',
    })
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
                <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        fullWidth
                        label="Short Version Title"
                        type="text"
                        value={this.state.title_short}
                        onChange={this.handleChange}
                        name='title_short'
                        helperText="This is how the club/team name will be seen in tables and fixtures"
                    />
                </Grid>
                <Grid item xs={6}>
                    Primary Colour: <input 
                        type="color" 
                        name="primary_color" 
                        value={this.state.primary_color} 
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    Secondary Colour: <input 
                        type="color" 
                        name="secondary_color" 
                        value={this.state.secondary_color} 
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="dense"
                        fullWidth
                        label="URL of Crest"
                        type="text"
                        value={this.state.crest}
                        onChange={this.handleChange}
                        name='crest'
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