import React, { Fragment } from 'react';
import {Grid,TextField,FormGroup,Card,CardHeader,Avatar, Snackbar,Button,CardContent,CardActions,InputLabel,MenuItem,FormControl,Select,Typography} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { getStandard, fetchQuery } from '../../utilities/fetch'

class RegisterForm extends React.Component {
    constructor(){
        super()
        this.state = {
            organisations:[],
            clubs:[],
            teams:[],
            email:"",
            password1:"", 
            password2:"", 
            title:"", 
            organisation:'',
            club:'',
            team:'',
            secret:'',
        }
    }
  
    async componentDidMount(){
        this.setState({
            organisations: await fetch('http://localhost:9000/api/organisation', getStandard)
                            .then(res=>res.json()),
            clubs:[],
            teams:[],
        })
    }
    async getClubs(org){
        if(org) this.setState({
                        clubs: await fetch('http://localhost:9000/api/organisation/'+org, getStandard)
                                        .then(res=>res.json())
                                        .then(res=>res.clubs)
                                        .catch(err=>console.log(err)),
                        teams:[]
                })
    }
    async getTeams(club){
        if(club) this.setState({
                    teams: await fetchQuery('http://localhost:9000/api/team', {club})
                                    .then(res=>res.json())
                                    .catch(err=>console.log(err))
                })
    }

    change = (e)=>{
        this.setState({[e.target.name]: e.target.value})
        if(e.target.name==='organisation') this.getClubs(e.target.value)
        if(e.target.name==='club') this.getTeams(e.target.value)
    }

    // TO-DO The snackbar disappears immediatly when invoked by onBlur
    checkPasswords = ()=>{
        if(this.state.password1.length<6){
            this.props.onError(true, "Password is too short. It must be at least 6 characters long")
            return false
        }else if(this.state.password1 !== this.state.password2 && this.state.password2!=='' && this.state.password1!==''){
            this.props.onError(true, "Passwords don't match")
            return false
        }
        return true
    }

    handleSnackbarClose = ()=>{
        this.props.onError(false, '')
    }

    onRegister = ()=>{
        this.validate() && this.props.onRegister(this.state)
    }

    validate = ()=>{
       if(!this.checkPasswords()) return false
       if(!this.state.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
           this.props.onError(true, "Email Address not valid")
           return false
       } 
       if(!this.state.title.match(/^[a-zA-Z ]+$/)){
           this.props.onError(true, "Name not valid")
           return false
       } 
       return true 
    }

    checkEmail = ()=>{
        this.state.email && fetch('http://localhost:9000/api/checkemail/'+this.state.email, getStandard)
            .then(res=>res.json())
            .then(res=>{
                if(res.exists) this.props.onError(true, "That email is already registered")
            })
            .catch(err=>console.log(err))

    }


    render() {
        const {classes} = this.props
        let organisations = this.state.organisations.map((org, key)=> <MenuItem value={org._id} key={key}>{org.title}</MenuItem>)
        let clubs = this.state.clubs.map((club, key)=> <MenuItem value={club._id} key={key}>{club.title}</MenuItem>)
        let teams = this.state.teams.map((team, key)=> <MenuItem value={team._id} key={key}>{team.title}</MenuItem>)
        return (
        <Fragment>
            <Grid container spacing={32}>
               <Grid item xs={false} sm={2}></Grid>
               <Grid item xs={12} sm={8}>                                    
                   <Card>
                       <CardHeader
                           avatar={
                            <Avatar className={classes.avatar}>R</Avatar>
                           }
                           title="Log In"
                           subheader="Register to access your team or league"
                       />
                       <CardContent>
                               <FormGroup>
                                   <TextField
                                       id="name"
                                       name="title"
                                       label="Full Name"
                                       className={classes.textField}
                                       type="text"
                                       value={this.state.title}
                                       onChange={this.change}
                                   />
                                   <TextField
                                       id="email"
                                       name="email"
                                       label="Email Address"
                                       className={classes.textField}
                                       type="email"
                                       value={this.state.email}
                                       onChange={this.change}
                                       onBlur={this.checkEmail}
                                   />
                                   <TextField
                                       id="password1"
                                       name="password1"
                                       label="Password1"
                                       className={classes.textField}
                                       type="password"
                                       value={this.state.password1}
                                       onChange={this.change}
                                       onBlur={this.checkPasswords}
                                   />
                                    <Typography variant="caption">
                                        * Must be minimum 6 characters long
                                    </Typography>
                                   <TextField
                                       id="password2"
                                       name="password2"
                                       label="Password2"
                                       className={classes.textField}
                                       type="password"
                                       value={this.state.password2}
                                       onChange={this.change}
                                   />
                                   <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="organisation">Organisation</InputLabel>
                                    <Select
                                        value={this.state.organisation}
                                        onChange={this.change}
                                        inputProps={{
                                            name: 'organisation',
                                            id: 'organisation',
                                        }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {organisations}
                                    </Select>
                                    </FormControl>
                                   
                                    <FormControl>
                                    <InputLabel htmlFor="club">Club</InputLabel>
                                    <Select
                                        value={this.state.club}
                                        onChange={this.change}
                                        inputProps={{
                                            name: 'club',
                                            id: 'club',
                                        }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {clubs}
                                    </Select>
                                    </FormControl>

                                    <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="team">Team</InputLabel>
                                    <Select
                                        value={this.state.team}
                                        onChange={this.change}
                                        inputProps={{
                                            name: 'team',
                                            id: 'team',
                                        }}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {teams}
                                    </Select>
                                    </FormControl>
                                   <TextField
                                       id="secret"
                                       name="secret"
                                       label="Who's your favourite player?"
                                       className={classes.textField}
                                       type="text"
                                       value={this.state.secret}
                                       onChange={this.change}
                                   />
                                    <Typography variant="caption">
                                        Please tell us your favourite all-time player. We will ask you this again if you forget your password.
                                    </Typography>

                               </FormGroup>
                                Already registered? <Button className={classes.button}>Log In</Button>
                       </CardContent>
                       <CardActions disableActionSpacing>     
                            <Button className={classes.keepRight} component={Link} to='/' from={window.location.pathname}>Cancel</Button>      
                            <Button variant="contained" color="primary" onClick={this.onRegister}>
                                Register
                            </Button>
                       </CardActions>
                   </Card>
                   {this.props.loginError && this.props.loginErrorProblem}
               </Grid>
               <Grid item xs={false} sm={2}></Grid>
           </Grid>
           
           <Snackbar
                anchorOrigin={{vertical:'top', horizontal:'center'}}
                open={this.props.registerError}
                onClose={this.handleSnackbarClose}
                autoHideDuration={2500}
                message={this.props.registerErrorProblem}
            />      
           </Fragment>
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

export default withStyles(styles)(RegisterForm);