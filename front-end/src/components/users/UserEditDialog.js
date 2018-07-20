import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, DialogContentText, DialogActions, TextField, FormControlLabel, Switch, Grid } from '@material-ui/core';

class UserEditDialog extends React.Component {
state=this.props.user || {}

changeText=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}
changeSwitch=(e)=>{
    let userType = e.target.checked ? Object.assign({
            isAdmin:false,
            isLeagueSecretary:false,
            isClubOfficial:false,
            isMember:false,
            isReferee:false,
            isTeamManager:false,
        }, {[e.target.name]:e.target.checked}
    ) : {[e.target.name]:e.target.checked}
    this.setState(userType)
}
onSave = ()=>{
    this.props.onSave(this.state)
}
render(){
    return (       
        <Dialog
            open={this.props.open}
            onClose={this.props.onClose}
        >
        <DialogTitle>
            Edit User
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Make changes to this user....
            </DialogContentText>
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="Full name"
                        type="text"
                        value={this.state.title}
                        onChange={this.changeText}
                        name='title'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="Email address"
                        type="text"
                        value={this.state.email}
                        onChange={this.changeText}
                        name='email'
                    />
                </Grid>
            </Grid>
            
            <DialogContentText>
                What type of user is this? They can only be one of the following.
            </DialogContentText>
            <Grid container>
                <Grid item xs={4}>
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isAdmin}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isAdmin'
                            />
                        }
                        label="Administrator"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isLeagueSecretary}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isLeagueSecretary'
                            />
                        }
                        label="League Secretary"
                    />
                </Grid>
                <Grid item xs={4}>                        
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isClubOfficial}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isClubOfficial'
                            />
                        }
                        label="Club Official"
                    />
                </Grid>
                <Grid item xs={4}>                    
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isReferee}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isReferee'
                            />
                        }
                        label="Referee"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isTeamManager}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isTeamManager'
                            />
                        }
                        label="Team Manager"
                    />
                </Grid>
                <Grid item xs={4}>                    
                    <FormControlLabel control={
                            <Switch
                                checked={this.state.isMember}
                                onChange={this.changeSwitch}
                                color="primary"
                                name='isMember'
                            />
                        }
                        label="Member"
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

export default UserEditDialog;