import React, { Component } from 'react';
import {Route, Switch } from "react-router-dom";
import Sidebar from './SidebarLayout'
import Header from './HeaderLayout'
import Advert from './Advert'

import withStyles from "@material-ui/core/styles/withStyles";
import defaultRoutes from '../../routes/HomeRoutes'

import * as soccer_03 from '../../assets/soccer_03.jpg'
import * as soccer_04 from '../../assets/soccer_04.jpg'
import Snack from '../Snack'
import { Grid, Zoom, Paper } from '@material-ui/core';

import USER from '../../USER'
import NewLeague from '../leagues/NewLeague';

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

        <USER.Consumer>
            { ({user})=> {
                return <Sidebar routes={routes} open={this.state.drawerOpen} user={user} closeDrawer={this.closeDrawer} {...this.props} className={classes.drawer} /> 
            } }
        </USER.Consumer>


                    
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                            
                        <Grid container spacing={32}>
                            <Grid item xs={12} sm={1} md={2} lg={2}></Grid>
                            <Grid item xs={12} sm={10} md={8} lg={8} > 
                                <Zoom in={true} style={{ transitionDelay: 250 }}>
                                    <Paper>                                        
                                        {/* <NewLeague/> */}
                                        {Routes}
                                    </Paper> 
                                </Zoom>
                                <Route path={`/`} component={Advert} exact={true} />
                            </Grid>
                            <Grid item xs={12} sm={1} md={2} lg={2}></Grid>
                        </Grid>

                    </main> 
                    <Snack/>
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
    backgroundImage:"url('"+soccer_03+"')",
    backgroundSize:'cover',
  },
  drawer:{
    backgroundImage:"url('"+soccer_04+"')",
    backgroundSize:'cover',
    height:'100%'
  },
  content: {
      poition:'absolute',
      left:0,
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
})


export default withStyles(styles)(MainLayout);