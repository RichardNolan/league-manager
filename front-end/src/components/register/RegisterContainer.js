import React, { Component } from 'react';
import RegisterForm from './RegisterForm'
import SNACK from '../../SNACK'
class RegisterContainer extends Component {

    onRegister({title, email, password1, password2, organisation, club, team, secret}){
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
        .catch(err=>this.props.showSnack(err))
    }

    login(res){
        console.log(res)
    }

    render() {
        return <RegisterForm onRegister={this.onRegister.bind(this)}  />
    }
}

// export default RegisterContainer;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <RegisterContainer {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;