import React, {Component} from 'react';
import {Grid,TextField,FormGroup,Card,CardHeader,Avatar,Button,CardContent,CardActions,Switch,Tooltip,FormControlLabel, Zoom} from '@material-ui/core'

import {Link} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

class LoginForm extends Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:"",
            rememberMe:false,
        }
    }
   
    changeEmail = (e)=>{
        this.setState({email: e.target.value})
    }
    changePassword = (e)=>{
        this.setState({password: e.target.value})
    }
    changeSwitch = (e)=>{
        this.setState({rememberMe: e.target.checked})
    }
    onLogin = ()=>{
        this.props.onLogin(this.state)
    }

    render() {
        const {classes} = this.props
        
        return (     
            <Grid container spacing={32}>
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                <Grid item xs={12} sm={10} md={8} lg={6} > 

                <Zoom in={true} style={{ transitionDelay: 250 }}>
                   <Card>
                       <CardHeader
                           avatar={
                           <Avatar>
                               L
                           </Avatar>
                           }
                           title="Log In"
                           subheader="Login to access your team or league"
                       />
                       <CardContent>
                               <FormGroup>
                                   <TextField
                                       id="email"
                                       label="Email Address"
                                       className={classes.textField}
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.changeEmail}
                                   />
                                   <TextField
                                       id="password"
                                       label="Password"
                                       className={classes.textField}
                                       type="password"
                                       value={this.state.password}
                                       onChange={this.changePassword}
                                   />
                               </FormGroup>
                                <FormControlLabel control={
                                                        <Tooltip id="tooltip-icon" title="Your password will be saved on this device">
                                                            <Switch
                                                                checked={this.state.rememberMe}
                                                                onChange={this.changeSwitch}
                                                                color="primary"
                                                            />
                                                        </Tooltip>
                                                        }
                                    label="Stay logged in"
                                />
                                <Button component={Link} to='/forgot' from={window.location.pathname}>Forgot Password</Button>
                                <Button  component={Link} to='/register' from={window.location.pathname}>Register</Button>
                       </CardContent>
                       <CardActions>     
                           <Button className={classes.keepRight} component={Link} to='/' from={window.location.pathname}>Cancel</Button>
                           <Button variant="contained" color="primary" onClick={this.onLogin}>
                               Login
                           </Button>
                       </CardActions>
                   </Card>    
                </Zoom>
                </Grid>
                <Grid item xs={12} sm={2} md={2} ></Grid>
            </Grid>
        );
    }
}

const styles=theme=>({
    
    textField: {
      margin: theme.spacing.unit,
    },
    keepRight:{
      marginLeft: 'auto',
    },
  })
  


export default withStyles(styles)(LoginForm);