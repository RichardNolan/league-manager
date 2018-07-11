
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import LeagueTable from '../tables/LeagueTable';
import Teams from '../teams/Teams';

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing.unit*3,
    },
    tabPanel:{
        padding: theme.spacing.unit*3,
    }
  });

const tabs = [
    {
        tab:0,
        label:'Teams',
        component: Teams
    },
    {
        tab:1,
        label:'Table',
        component: LeagueTable
    },
    {
        tab:2,
        label:'Fixtures',
        component: LeagueTable
    },
    {
        tab:3,
        label:'Results',
        component: LeagueTable
    },
]

class Division extends Component {
    state = {
      value: 0,
    }

    handleTabs = (e, value) => {
      this.setState({ value });
    }
  
    render() {
        let {classes} = this.props
        let {value} = this.state
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Typography component="div" style={{ padding: 8 * 3 }} color='inherit'>
                        {this.props.division.title}
                    </Typography>                    
                    <Tabs value={value} onChange={this.handleTabs}>
                        {tabs.map((tab, key)=><Tab label={tab.label} key={key} />)}
                    </Tabs>
                </AppBar>
                {tabs
                    .filter(tab=>tab.tab===value)
                    .map((tab, key)=>{
                        let Panel = tab.component
                        return (
                            <div className={classes.tabPanel} key={key}>
                                <Panel division={this.props.division._id} />
                            </div>
                        )
                    })
                }         
            </div>
        );
    }
}

export default withStyles(styles)(Division);

