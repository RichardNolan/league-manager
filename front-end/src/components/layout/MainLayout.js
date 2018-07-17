import React, { Component } from 'react';
import {Route, Switch } from "react-router-dom";
import Hidden from '@material-ui/core/Hidden';
import Sidebar from '../layout/SidebarLayout'
import Header from '../layout/HeaderLayout'

import withStyles from "@material-ui/core/styles/withStyles";
import JSStyle from '../../assets/jss/JSStyle'
import defaultRoutes from '../../routes/HomeRoutes'
import { ClickAwayListener } from '@material-ui/core';


class MainLayout extends Component {
    state={
        drawerOpen:false,
    }

    toggleDrawer = ()=>{
        this.setState({drawerOpen:!this.state.drawerOpen})
    }

    closeDrawer = ()=>{
        this.setState({drawerOpen:false})
    }

    render() {  
        const {classes} = this.props; 
        let routes = this.props.routes || defaultRoutes
        const Routes = (
            <Switch>
              {routes && routes.map((prop, key) => <Route path={`${this.props.match.url}${prop.path}`} component={prop.component} key={key} exact={false} /> )} 
            </Switch>
          );

        return (
                <div className={classes.wrapper}> 
                    <Header toggleDrawer={this.toggleDrawer} open={this.state.drawerOpen} />
                        <Sidebar routes={routes} open={this.state.drawerOpen} closeDrawer={this.closeDrawer} {...this.props} /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {Routes}
                    </main> 
                </div>
        );
    }
}

const styles = theme=>({
    
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
    flexGrow: 1,
    zIndex: 1,
    display: 'flex',
    overflowY:'auto',
  },
  content: {
      poition:'absolute',
      left:0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})


export default withStyles(styles)(MainLayout);