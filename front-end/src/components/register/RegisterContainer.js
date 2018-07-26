import React, { Component } from 'react';
import { post } from '../../utilities/fetch'
import RegisterForm from './RegisterForm'
import SNACK from '../../SNACK'
class RegisterContainer extends Component {

    onRegister({title, email, password1, password2, organisation, club, team, secret}){
        if(organisation==='')organisation=null
        if(club==='')club=null
        if(team==='')team=null
        fetch('http://localhost:9000/api/signup/', post({title, email, password1, password2, organisation, club, team, secret, isMember:true}))
        .then(res=>res.json())
        .then(res=>this.props.showSnack(res.message))
        .then(res=>document.location.href='/login')
        .catch(err=>this.props.showSnack(err))
    }

    // login(res){
    //     console.log(res)
    // }

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