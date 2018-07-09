import React, {Component} from 'react';
import {Grid,TextField,FormGroup,Card,CardHeader,Avatar,Button,CardContent,CardActions,Snackbar,Switch,Tooltip,FormControlLabel} from '@material-ui/core'

import {Link} from 'react-router-dom'

import JSStyle from '../../assets/jss/JSStyle'
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

    handleSnackbarClose = ()=>{
        this.props.onError(false, '')
    }

    showsnack = () =>{
        this.setState({
            SnackbarMessage:'testing',
            SnackbarOpen:true
        })
    }

    render() {
        const {classes} = this.props
        
        return (     
            <Grid container spacing={32}>
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                <Grid item xs={12} sm={10} md={8} lg={6} > 


                   <Card>
                       <CardHeader
                           avatar={
                           <Avatar className={classes.avatar}>
                               L
                           </Avatar>
                           }
                           title="Log In"
                           subheader="Login to access your team or league"
                           // className={classes.cardHeader}
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
                                       // autoComplete="email-address"
                                       // margin="normal"
                                   />
                                   <TextField
                                       id="password"
                                       label="Password"
                                       className={classes.textField}
                                       type="password"
                                       value={this.state.password}
                                       onChange={this.changePassword}
                                       // autoComplete="current-password"
                                       // margin="normal"
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
                                <Button className={classes.button} component={Link} to='/forgot' from={window.location.pathname}>Forgot Password</Button>
                                <Button className={classes.button} component={Link} to='/register' from={window.location.pathname}>Register</Button>
                       </CardContent>
                       <CardActions className={classes.actions} disableActionSpacing>     
                           <Button className={classes.button} component={Link} to='/' from={window.location.pathname}>Cancel</Button>
                      
                           <Button variant="contained" color="primary" className={classes.signin} onClick={this.onLogin}>
                               Login
                           </Button>
                       </CardActions>
                   </Card>

                   
                    <Snackbar
                        anchorOrigin={{vertical:'top', horizontal:'center'}}
                        open={this.props.loginError}
                        onClose={this.handleSnackbarClose}
                        autoHideDuration={2500}
                        message={this.props.loginErrorProblem}
                    />      

                </Grid>
                <Grid item xs={12} sm={2} md={2} ></Grid>
            </Grid>
        );
    }
}



export default withStyles(JSStyle)(LoginForm);