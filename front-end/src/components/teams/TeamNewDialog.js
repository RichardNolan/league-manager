import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, Grid} from '@material-ui/core';
import Categories from '../Categories';
import ClubMenu from '../clubs/ClubMenu';

class TeamNewDialog extends React.Component {
    state={
        title:'',
        category:'',
        club:'',
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onSave = ()=>{
        this.props.onSave(this.state)
        this.setState({title:'', category:'', club:''})
    }
    handleCategory(category){        
        this.setState({category})
    }
    handleClub(club){ 
        this.setState({club})
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
                    {
                        this.props.club || (this.props.match && this.props.match.params.club)
                            ? null 
                            : <ClubMenu 
                                organisation={(this.props.user && this.props.user.organisation) || null} 
                                club={this.state.club} 
                                onChange={this.handleClub.bind(this)} 
                              />
                    }
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