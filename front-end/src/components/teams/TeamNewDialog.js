import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Grid} from '@material-ui/core';
import Categories from '../Categories';

class TeamNewDialog extends React.Component {
    state={
        title:''
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSave = ()=>{
        this.props.onSave(this.state)
        this.setState({title:'', category:null})
    }
    handleCategory(cat){        
        this.setState({category:cat})
    }
    render(){
        return (       
            <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
            >
            <DialogTitle>
                Create a new Team
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please provide a name title for the Team you wish to add.
                </DialogContentText>
                <Grid container>
                    {/* TO-DO make the menu and see what has to be returned */}
                    {this.props.club ? null : 'MENU FOR CLUB'}
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            label="Team Title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleChange}
                            name='title'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Categories 
                            category={this.state.category}
                            onChange={this.handleCategory.bind(this)}
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

export default TeamNewDialog;