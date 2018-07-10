import React, { Component, Fragment } from 'react';
import {Route, Switch } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import Sidebar from '../layout/SidebarLayout'
import Header from '../layout/HeaderLayout'

import withStyles from "@material-ui/core/styles/withStyles";
import JSStyle from '../../assets/jss/JSStyle'
import defaultRoutes from '../../routes/HomeRoutes'
import LoginLayout from "../login/LoginLayout";


class MainLayout extends Component {
    render() {  
        const {classes } = this.props; 
        let routes = this.props.routes || defaultRoutes

        const Routes = (
            <Switch>
              {routes && routes.map((prop, key) => <Route path={`${this.props.match.url}${prop.path}`} component={prop.component} key={key} exact={false} /> )} 
            </Switch>
          );

        return (
            <Fragment>            
            <div className={classes.wrapper}> 
                <Header />
                <Hidden smDown>
                    <Sidebar routes={routes} {...this.props} /> 
                </Hidden>               
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                   {Routes}
                   {/* <Route path={`${this.props.match.url}login`} component={LoginLayout} exact={true} />  */}
                </main> 
            </div>
            </Fragment>
        );
    }
}

export default withStyles(JSStyle)(MainLayout);