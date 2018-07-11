
import React, { Fragment, Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ls from './utilities/localStorage'
import {setAuthorization} from './utilities/fetch'

import USER from './USER'

// THE MANY ROUTES SAMPLE
import Routes from "./routes";
const routes = Routes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} />)

const hist = createBrowserHistory();


class App extends Component {
    constructor(){
        super()

        this.addUser = (user)=>{
            this.setState({user})
        }
// TO-DO CAN I GET THE EXPIRED DATE ON THE TOKEN TO CHECK ITS STILL VALID?
// OR MAYBE SAVE THE USERNAME AND PW TO LS AND LOGIN AUTOMATICALLY FROM HERE 
        this.state = {
            user: {
                success: ls.get('success'),
                user:ls.get('user'),
                token:ls.get('token'),
                redirectTo: ls.get('redirectTo')
            } || {},
            newUser:this.addUser
        }
        ls.get('token') && setAuthorization(ls.get('token'))
    }

    render() {
        return (
            <Fragment>
                <USER.Provider value={this.state}>
                <Router history={hist}>   
                    <Switch>
                        {routes}
                        {/* <Route path="/" component={MainLayout} /> */}
                    </Switch>
                </Router>
                </USER.Provider>                
            </Fragment>
        );
    }
}

export default App;
