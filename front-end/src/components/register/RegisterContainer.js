import React, { Component } from 'react';
import RegisterForm from './RegisterForm'

class RegisterContainer extends Component {
    constructor(){
        super()
        this.state={
            registerError:false,
            registerErrorWith: "",
            registerErrorProblem: ""
        }
    }
    
    setError(isError, message){  
        if(isError===false) message=''      
        this.setState({
            registerError:isError, 
            registerErrorProblem: message 
        })
    }

    onRegister({title, email, password1, password2, organisation, club, team, secret}){
        this.setError(false, '')
        fetch('http://localhost:9000/api/signup/', 
        // TO-DO EASY Make a standardPost object in utilities/fetch 
        {
            method: 'POST',
            body: JSON.stringify({title, email, password1, password2, organisation, club, team, secret}),
            headers: {
              'content-type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache',
        })
        .then(res=>res.json())
        .then(res=>{console.log(res);return res;})
        // .then(res=>this.logIn(res))
        .catch(err=>console.log(err))
        // if(register.error){ 
        //     this.setError(true, register.message)
        // }else{
        //     this.logIn()
        // }
    }

    login(res){
        console.log(res)
    }

    render() {
        return <RegisterForm onError={this.setError.bind(this)} onRegister={this.onRegister.bind(this)} {...this.state} />
    }
}

export default RegisterContainer;