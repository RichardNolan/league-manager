import React, { Component, Fragment } from 'react';
import LoginForm from './LoginForm'
import {validateEmail} from '../../utilities/validation'
import {setAuthorization, post} from '../../utilities/fetch'
import {typeOfUser} from '../../utilities/utils'
import ls from '../../utilities/localStorage'
import {Grid,TextField,FormGroup,Card,CardHeader,Avatar, Button,CardContent,CardActions,InputLabel,LinearProgress,FormControlLabel,Tooltip,Typography,Zoom} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'

import SNACK from '../../SNACK'

class ChangePassword extends Component {
    constructor(){
        super()
        this.state={
            progressBar:false,
            email:"",
            password:"", 
            password1:"", 
            password2:"", 
        }
    }
    
    change = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    checkPasswords = ()=>{
        if(this.state.password1.length<6){
            this.props.showSnack("Password is too short. It must be at least 6 characters long")
            return false
        }else if(this.state.password1 !== this.state.password2 && this.state.password2!=='' && this.state.password1!==''){
            this.props.showSnack("Passwords don't match")
            return false
        }
        return true
    }
    checkEverything = ()=>{
        if(!this.checkPasswords()){
            return false;
        }else if(!this.state.email) {
            this.props.showSnack("You need to enter your email address")
            return false
        }else if(!this.state.password) {
            this.props.showSnack("You need to enter your existing password")
            return false
        }else if(!this.state.password1) {
            this.props.showSnack("You need to enter your new password")
            return false
        }else if(!this.state.password2) {
            this.props.showSnack("You need to enter your confirm your new password")
            return false
        }else{
            return true;
        }
    }
    onChangePassword = ()=>{
        if(!this.checkEverything()) return;
        this.setState({progressBar:true})  
        fetch('http://localhost:9000/api/changepassword',post(this.state))
            .then(res=>res.json())
            .then(res=>{
                if(!res.success) throw(res.message)
                return res
            })
            .then(res=>{
                this.setState({progressBar:false}) 
                document.location.href = '/login'
            })
            .catch(err=>{
                this.setState({progressBar:false})  
                this.props.showSnack(err)
            })
    }


    render() {
        const {classes} = this.props
        return (
            <Fragment>
                {this.state.progressBar && <LinearProgress/>}
                <Grid container spacing={32}>
                    <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                    <Grid item xs={12} sm={10} md={8} lg={6} > 

                    <Zoom in={true} style={{ transitionDelay: 250 }}>
                    <Card>
                        <CardHeader
                            avatar={
                            <Avatar>
                                P
                            </Avatar>
                            }
                            title="Change Password"
                            subheader="Need to chane your password? Just provide your existing details and your new password."
                        />
                        <CardContent>
                                <FormGroup>
                                    <TextField
                                        id="email"
                                        label="Email Address"
                                        className={classes.textField}
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.change}
                                    />
                                    <TextField
                                        id="password"
                                        label="Existing Password"
                                        className={classes.textField}
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.change}
                                    />
                                    <TextField
                                        id="password1"
                                        name="password1"
                                        label="New Password"
                                        className={classes.textField}
                                        type="password"
                                        value={this.state.password1}
                                        onChange={this.change}
                                        onBlur={this.checkPasswords}
                                    />
                                    <TextField
                                        id="password2"
                                        name="password2"
                                        label="Retype New Password"
                                        className={classes.textField}
                                        type="password"
                                        value={this.state.password2}
                                        onChange={this.change}
                                        onBlur={this.checkPasswords}
                                    />
                                     <Typography variant="caption">
                                         * Must be minimum 6 characters long
                                     </Typography>
                                </FormGroup>
                        </CardContent>
                        <CardActions>     
                            <Button className={classes.keepRight} component={Link} to='/' from={window.location.pathname}>Cancel</Button>
                            <Button variant="contained" color="primary" onClick={this.onChangePassword}>
                                Change Password
                            </Button>
                        </CardActions>
                    </Card>    
                    </Zoom>
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} ></Grid>
                </Grid>
            </Fragment>
        )
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

// export default LoginContainer;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <ChangePassword {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);