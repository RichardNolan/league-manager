
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import LeagueTable from '../tables/LeagueTable';
import Fixtures from "../fixtures/Fixtures";
import Results from "../results/Results";

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing.unit*3,
    },
    tabPanel:{
        // padding: theme.spacing.unit*3,
    }
  });

const tabs = [
    {
        tab:0,
        label:'Table',
        component: LeagueTable
    },
    {
        tab:1,
        label:'Fixtures',
        component: Fixtures
    },
    {
        tab:2,
        label:'Results',
        component: Results
    },
]

class Division extends Component {
    state = {
      value: 0,
      teams:[],
    }

    handleTabs = (e, value) => {
      this.setState({ value });
    }
    
  

    render() {
        let {classes} = this.props
        let {value} = this.state
        let division = this.props.division || this.props.match.params.division
        let id = typeof division==='string' ? division : this.props.division._id
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Typography component="div" style={{ padding: 8 * 3 }} color='inherit'>
                        {this.props.division && this.props.division.title}
                    </Typography>                    
                    <Tabs 
                        value={value} 
                        onChange={this.handleTabs}
                        scrollable
                        scrollButtons="auto"
                    >
                        {tabs.map((tab, key)=><Tab label={tab.label} key={key} />)}
                    </Tabs>
                </AppBar>
                {tabs
                    .filter(tab=>tab.tab===value)
                    .map((tab, key)=>{
                        let Panel = tab.component
                        return (
                            <div className={classes.tabPanel} key={key}>
                                <Panel division={id} />
                            </div>
                        )
                    })
                }         
            </div>
        );
    }
}

export default withStyles(styles)(Division);

