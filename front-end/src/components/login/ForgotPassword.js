import React, { Component } from 'react';
import {Grid,TextField,FormGroup,Card,CardHeader,Avatar,Button,CardContent,CardActions,Snackbar,Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'

import JSStyle from '../../assets/jss/JSStyle'
import { withStyles } from '@material-ui/core/styles'

class ForgotMessage extends Component {
    state = {
        email:"",
        secret:"",
        showSnack:false,
        message:'',
    }

    changeEmail = (e)=>{
        this.setState({email: e.currentTarget.value})
    }
    changeSecret = (e)=>{
        this.setState({secret: e.currentTarget.value})
    }

    snack(showSnack, message){  
        if(showSnack===false) message=''      
        this.setState({
            showSnack, 
            message
        })
    }
    handleSnackbarClose = ()=>{
        this.snack(false, '')
    }
    
    onSendPassword = ()=>{
        this.snack(false, '')
        let {email, secret} = this.state
        fetch('http://localhost:9000/api/forgotpassword',
        // TO-DO Make a standardPost object in utilities/fetch  
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
                this.snack(true, res.message)
                setTimeout(()=>window.location.href='/login', 2500)
            }
           this.setState({email:''})
        })
        .catch(err=>this.snack(true, err))
    }

    render() {
        let {classes} = this.props
        return (  
            <Grid container spacing={32}>
                <Grid item xs={2} sm={3}></Grid>
                <Grid item xs={12} sm={6}> 
                   <Card>
                       <CardHeader
                           avatar={
                           <Avatar className={classes.avatar}>
                               F
                           </Avatar>
                           }
                           title="Forgot your password?"
                           subheader="If you provide us with your email address, we'll send you a new password."
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
                                    id="secret"
                                    label="Who's your favourite player?"
                                    className={classes.textField}
                                    type="text"
                                    value={this.state.secret}
                                    onChange={this.changeSecret}
                                    // autoComplete="email-address"
                                    // margin="normal"
                                />
                                <Typography variant="caption" gutterBottom align="center">
                                  When you registered we asked you who your favourite player was.
                                </Typography>
                            </FormGroup>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>     
                            <Button className={classes.button} component={Link} to='/login' from={window.location.pathname}>Cancel</Button>                        
                            <Button variant="contained" color="primary" className={classes.signin} onClick={this.onSendPassword} >
                                Send me new password
                            </Button>
                        </CardActions>
                    </Card>


                    <Snackbar
                        anchorOrigin={{vertical:'top', horizontal:'center'}}
                        open={this.state.showSnack}
                        onClose={this.handleSnackbarClose}
                        autoHideDuration={2500}
                        message={this.state.message}
                    />      

                </Grid>
                <Grid item xs={2} sm={3}></Grid>
            </Grid>
        );
    }
}

export default withStyles(JSStyle)(ForgotMessage);