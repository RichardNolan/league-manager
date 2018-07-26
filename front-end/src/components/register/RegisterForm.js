import React from 'react';
import {TextField,FormGroup,Card,CardHeader,Avatar, Button,CardContent,CardActions,InputLabel,MenuItem,FormControl,Select,Typography} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import { getStandard, fetchQuery } from '../../utilities/fetch'
import SNACK from '../../SNACK'
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
            emailOK:true,
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
                                        .catch(err=>this.props.showSnack(err)),
                        teams:[]
                })
    }
    async getTeams(club){
        if(club) this.setState({
                    teams: await fetchQuery('http://localhost:9000/api/team', {club})
                                    .then(res=>res.json())
                                    .catch(err=>this.props.showSnack(err))
                })
    }

    change = (e)=>{
        this.setState({[e.target.name]: e.target.value})
        if(e.target.name==='organisation') this.getClubs(e.target.value)
        if(e.target.name==='club') this.getTeams(e.target.value)
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

    onRegister = ()=>{
        this.validate() && this.props.onRegister(this.state)
    }

    validate = ()=>{
        if(!this.state.emailOK) return false
       if(!this.checkPasswords()) return false
       if(!this.state.email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            this.props.showSnack("Email Address not valid")
           return false
       } 
       if(!this.state.secret || this.state.secret===''){
        this.props.showSnack("You haven't provided the name of your favourite player. We need this if you forget your password.")
        return false
        }
       if(!this.state.title.match(/^[a-zA-Z ]+$/)){
            this.props.showSnack("Name not valid")
           return false
       } 
       return true 
    }

    checkEmail = ()=>{
        this.state.email && fetch('http://localhost:9000/api/checkemail/'+this.state.email, getStandard)
            .then(res=>res.json())
            .then(res=>{
                if(res.exists) {
                    this.props.showSnack("That email is already registered")
                    this.setState({emailOK:false})
                }else{
                    this.setState({emailOK:true})
                }
            })
            .catch(err=>this.props.showSnack(err))

    }

    render() {
        const {classes} = this.props
        let organisations = this.state.organisations.map((org, key)=> <MenuItem value={org._id} key={key}>{org.title}</MenuItem>)
        let clubs = this.state.clubs.map((club, key)=> <MenuItem value={club._id} key={key}>{club.title}</MenuItem>)
        let teams = this.state.teams.map((team, key)=> <MenuItem value={team._id} key={key}>{team.title}</MenuItem>)
        return (
                        
            <Card>
                <CardHeader
                    avatar={
                    <Avatar className={classes.avatar}>R</Avatar>
                    }
                    title="Register"
                    subheader="Register to have easy access to your team or league"
                />
                <CardContent>
                        <FormGroup>
                            <TextField
                                id="name"
                                name="title"
                                label="Your Full Name"
                                className={classes.textField}
                                type="text"
                                value={this.state.title}
                                onChange={this.change}
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Your Email Address"
                                className={classes.textField}
                                type="email"
                                value={this.state.email}
                                onChange={this.change}
                                onBlur={this.checkEmail}
                                style={!this.state.emailOK ? {backgroundColor:'red'} : {}}
                            />
                            <TextField
                                id="password1"
                                name="password1"
                                label="Your Password"
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
                                label="Re-type your Password"
                                className={classes.textField}
                                type="password"
                                value={this.state.password2}
                                onChange={this.change}
                                onBlur={this.checkPasswords}
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

// export default withStyles(styles)(RegisterForm);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <RegisterForm {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);