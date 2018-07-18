import React, { Fragment }  from 'react';
import {AppBar,Toolbar,Typography,Button, IconButton} from '@material-ui/core'
import {Menu, ChevronLeft} from '@material-ui/icons' 
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import USER from '../../USER'
import AccountMenu from './AccountMenu';

const Header = (props) => {
  let { classes, title } = props
  return (   
    <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      
    <IconButton
      color="inherit"
      onClick={props.toggleDrawer}
      className={classes.menuButton}
    >
      {props.open ? <ChevronLeft /> : <Menu />}
    </IconButton>
      <Typography variant="title" color="inherit" noWrap className={classes.flex}>
        League Manager {title}
      </Typography>

         <USER.Consumer>
           { ( {user, newUser} )=>{
                  return user.token 
                    ? <AccountMenu user={user}/>
                    : (
                      <Fragment>
                        <Button size="small" color="inherit" component={Link} to={'/login'} from={window.location.href}>Login</Button>
                        <Button size="small" color="inherit" component={Link} to={'/register'} from={window.location.href}>Register</Button>
                      </Fragment>
                      )
             }
           }
         </USER.Consumer>
         
    </Toolbar>
  </AppBar>
  );
};

const styles=theme=>({
  flex: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton:{
    marginRight:theme.spacing.unit*3
  }
})

export default withStyles(styles)(Header);
