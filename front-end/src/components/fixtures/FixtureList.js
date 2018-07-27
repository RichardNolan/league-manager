import React from 'react';
import * as moment from 'moment'
import * as _ from 'lodash'
import { AppBar, Tabs, Tab, LinearProgress } from '@material-ui/core';
import FixtureSet from './FixtureSet';
import EditFixtureDialog from './EditFixtureDialog';
import {  post, DB_HOST } from '../../utilities/fetch';
import SNACK from '../../SNACK'

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
    saveFixture(newFixture){
        this.setState({editFixtureDialogOpen:false, progressBar:true})
        let fixture = this.state.fixtureToEdit
        fixture.date = newFixture.date
        fixture.referee = newFixture.referee
        fetch(`${DB_HOST}/api/fixture/${fixture._id}`, post({date:newFixture.date, referee:newFixture.referee}))
            .then(res=>{
                this.setState({progressBar:false})
                return res
            })
            .catch(err=>this.props.showSnack(err))
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
                onSave={this.saveFixture.bind(this)} 
                fixture={this.state.fixtureToEdit}
            />
            </div>
        )
    }
};

// export default FixtureList;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <FixtureList {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;