import React from 'react';
import * as moment from 'moment'
import * as _ from 'lodash'
import { AppBar, Tabs, Tab, LinearProgress } from '@material-ui/core';
import FixtureSet from './FixtureSet';
import EditFixtureDialog from './EditFixtureDialog';
import {  post } from '../../utilities/fetch';

class FixtureList extends React.Component {
    state={
        value:0,
        groups: null,
        editFixtureDialogOpen:false,
        fixtureToEdit : null,
        progressBar:false,
    }

    handleTabs = (e, value) => {
        this.setState({ value });
      
    }

    openEditFixtureDialog = (fixture)=>{
        this.setState({ editFixtureDialogOpen:true, fixtureToEdit:fixture });
    }

    closeEditFixtureDialog(){
        this.setState({editFixtureDialogOpen:false})
    }
    newFixtureDate(newDate){
        this.setState({editFixtureDialogOpen:false, progressBar:true})
        let fixture = this.state.fixtureToEdit
        fixture.date = newDate
        fetch(`http://localhost:9000/api/fixture/${fixture._id}`, post({date:newDate}))
            .then(res=>{
                this.setState({progressBar:false})
                return res
            })
            .catch(err=>console.error(err))
    }

    render(){
        let {value} = this.state
        let {fixtures} = this.props
        let fixtureGroups =     _.groupBy(fixtures, (x)=>{
                                    return moment(x.date).format("ddd, MMM Do")
                                })
        let tabs =  Object.keys(fixtureGroups)
                        // .sort()
                        .map((group, index)=>(
                            <Tab 
                                key={index} 
                                label={group} 
                            />
                        ))
        let tabContent  = Object.keys(fixtureGroups)
                            // .sort()
                            .map((group, index)=>(
                                <FixtureSet 
                                    title={group}
                                    fixtures={fixtureGroups[group]} 
                                    key={index} 
                                    openEditFixtureDialog={this.openEditFixtureDialog.bind(this)}
                                />
                            ))                
        return (
            <div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={this.handleTabs}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                >
                    {tabs}                
                </Tabs>
                {this.state.progressBar && <LinearProgress/>}
                {tabContent[value]}
            </AppBar>
            <EditFixtureDialog 
                open={this.state.editFixtureDialogOpen} 
                onClose={this.closeEditFixtureDialog.bind(this)} 
                onSave={this.newFixtureDate.bind(this)} 
                fixture={this.state.fixtureToEdit}
            />
            </div>
        )
    }
};

export default FixtureList;