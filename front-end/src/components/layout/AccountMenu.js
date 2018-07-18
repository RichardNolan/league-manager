import React, { Component, Fragment } from 'react';
import {IconButton,Typography,Menu,MenuItem} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom'
import LogoutDialog from '../login/LogoutDialog'
import { withStyles } from '@material-ui/core/styles'


class AccountMenu extends Component { 
    state = {
        auth: true,
        anchorEl: null,
        dialogOpen:false,
    };

    handleOpenMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    handleDialogOpen = () =>{
        this.setState({ dialogOpen: true });
    }
    handleDialogClose = () =>{
        this.setState({ dialogOpen: false });
        this.handleCloseMenu()
    }
    handleDialogYes = () =>{
        this.handleCloseMenu()
    }
    handleDialogNo = () =>{
        this.handleCloseMenu()
    }
    render() {
        const { user } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            
            <Fragment>
                <Typography variant='caption' color="inherit">
                    {user.user.email}
                </Typography>
                
                <IconButton onClick={this.handleOpenMenu} color="inherit">
                    <AccountCircle />
                </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
              transformOrigin={{ vertical: 'top', horizontal: 'right',}}
              open={open}
              onClose={this.handleCloseMenu}
            >
              <MenuItem onClick={this.handleCloseMenu} component={Link} to={user.redirectTo} from={window.location.pathname}>Dashboard</MenuItem>
              <MenuItem onClick={this.handleCloseMenu}>My account</MenuItem>
              <MenuItem onClick={this.handleDialogOpen}>Logout</MenuItem>
              <LogoutDialog yes={this.handleDialogYes} no={this.handleDialogNo} open={this.state.dialogOpen} onClose={this.handleDialogClose}/>
            </Menu>
          </Fragment>
        );
    }
}
const styles={
    
}
export default withStyles(styles)(AccountMenu);