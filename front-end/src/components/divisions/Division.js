
import React, { Component } from 'react';
import {getStandard, DB_HOST} from '../../utilities/fetch'
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, LinearProgress } from '@material-ui/core';
import LeagueTable from '../tables/LeagueTable';
import Fixtures from "../fixtures/Fixtures";
import Results from "../results/Results";
import SNACK from '../../SNACK'

const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginBottom: theme.spacing.unit*3,
    },
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
      division: (this.props.match && this.props.match.params.division) || null,
      title:'',
      progressBar:false,
    }

    handleTabs = (e, value) => {
      this.setState({ value });
    }
    
    componentDidMount(){
        this.state.division && this.fetchData()
    }

  fetchData = ()=>{      
    this.setState({progressBar:true})  
    fetch(`${DB_HOST}/api/division/${this.state.division}`, getStandard())
        .then(res=>res.json())
        .then(division=>{
            this.setState({title:division.title, progressBar:false})
        })
        .catch(err=>{
            this.setState({progressBar:false})
            this.props.showSnack(err)
        })

  }

    render() {
        let {classes} = this.props
        let {value} = this.state
        let division = this.props.division || this.props.match.params.division
        let id = typeof division==='string' ? division : this.props.division._id
        return (
            <div className={classes.root}> 
                {this.state.progressBar && <LinearProgress/>} 
                <AppBar position="static">
                    <Typography variant='headline'  style={{ padding: 8 * 3 }} color='inherit'>
                        {this.state.title || (this.props.division && this.props.division.title)}
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
                            <div key={key}>
                                <Panel division={id} />
                            </div>
                        )
                    })
                }         
            </div>
        );
    }
}

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Division {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);

// export default withStyles(styles)(Division);

