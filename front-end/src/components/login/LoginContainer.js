import React, { Component, Fragment } from 'react';
import LoginForm from './LoginForm'
import {validateEmail} from '../../utilities/validation'
import {setAuthorization, DB_HOST} from '../../utilities/fetch'
import {typeOfUser} from '../../utilities/utils'
import ls from '../../utilities/localStorage'
import { LinearProgress } from '@material-ui/core';
import SNACK from '../../SNACK'

class LoginContainer extends Component {
    constructor(){
        super()
        this.state={
            token:'',
            progressBar:false,
        }
    }
    
    onLogin({email, password, rememberMe}){
        if(!email || !password) {
            this.props.showSnack("You need to enter both a username and a password")
            return;
        }
        this.setState({progressBar:true})  
        if( !validateEmail( email ) ) return;
        fetch(DB_HOST+'/api/signin',
        // TO-DO EASY Make a standardPost object in utilities/fetch  
        {
            method: 'POST',
            body: JSON.stringify({email, password, rememberMe}),
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
        })
        .then(res=>res.json())
        .then(res=>{
            if(!res.success) throw(res.message)
            setAuthorization(res.token);
            return res
        })
        .then(res=>{
            this.setState({progressBar:false}) 
            let type_of_user = res.user && typeOfUser(res.user)
            res.redirectTo = type_of_user ? '/'+(type_of_user.substring(2,type_of_user.length)).toLowerCase()+'' : '/'

            rememberMe ? ls.set(res) : ls.clear()
            this.props.onLogin(res) 
        })
        .catch(err=>{
            this.setState({progressBar:false})  
            this.props.showSnack(err)
        })
    }


    render() {
        return (
            <Fragment>
                {this.state.progressBar && <LinearProgress/>}
                <LoginForm onLogin={this.onLogin.bind(this)} exact={true} />
            </Fragment>
        )
    }
}

// export default LoginContainer;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <LoginContainer {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;