import React, { Component } from 'react';
import {TextField,FormGroup,Card,CardHeader,Avatar,Button,CardContent,CardActions,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import SNACK from '../../SNACK'
 
class ForgotMessage extends Component {
    state = {
        email:"",
        secret:"",
    }

    changeEmail = (e)=>{
        this.setState({email: e.currentTarget.value})
    }
    changeSecret = (e)=>{
        this.setState({secret: e.currentTarget.value})
    }

    onSendPassword = ()=>{
        this.props.showSnack('')
        let {email, secret} = this.state
        if(!email || !secret) return;
        fetch('http://localhost:9000/api/forgotpassword',
        // TO-DO EASY Make a standardPost object in utilities/fetch  
        {
            method: 'POST',
            body: JSON.stringify({email, secret}),
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })
        .then(res=>res.json())
        .then(res=>{
           if(!res.success) throw res.message
           else {
                window.open(res.link,'_blank');
                this.props.showSnack(res.message)
                setTimeout(()=>window.location.href='/login', 2500)
            }
           this.setState({email:''})
        })
        .catch(err=>this.props.showSnack(err))
    }

    render() {
        let {classes} = this.props
        return (  
                   <Card>
                       <CardHeader
                           avatar={<Avatar className={classes.avatar}>F</Avatar>}
                           title="Forgot your password?"
                           subheader="If you provide us with your email address, we'll send you a new password."
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
                                    id="secret"
                                    label="Who's your favourite player?"
                                    className={classes.textField}
                                    type="text"
                                    value={this.state.secret}
                                    onChange={this.changeSecret}
                                />
                                <Typography variant="caption" gutterBottom align="center">
                                  When you registered we asked you who your favourite player was.
                                </Typography>
                            </FormGroup>
                        </CardContent>
                        <CardActions >     
                            <Button className={classes.keepRight} component={Link} to='/login' from={window.location.pathname}>Cancel</Button>                        
                            <Button variant="contained" color="primary" onClick={this.onSendPassword} >
                                Send me new password
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

// export default withStyles(styles)(ForgotMessage);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <ForgotMessage {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);