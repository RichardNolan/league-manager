import React from 'react';
import * as moment from 'moment'
import * as _ from 'lodash'
import { AppBar, Tabs, Tab, LinearProgress } from '@material-ui/core';
import ResultSet from './ResultSet';
import NewScoreDialog from '../scores/NewScoreDialog';
import {  post } from '../../utilities/fetch';

class ResultList extends React.Component {
    state={
        value:0,
        groups: null,
        newScoreDialogOpen:false,
        resultToEdit : null,
        progressBar:false,
    }

    handleTabs = (e, value) => {
        this.setState({ value });
    }

    openNewScoreDialog = (result)=>{
        this.setState({ newScoreDialogOpen:true, resultToEdit:result });
    }

    closeNewScoreDialog(){
        this.setState({newScoreDialogOpen:false})
    }

    saveScore({_id, home, away}){
        this.setState({newScoreDialogOpen:false, progressBar:true})
        let scores = {}   
        
        this.props.user.isLeagueSecretary && (scores.score_home = home)
        this.props.user.isLeagueSecretary && (scores.score_away = away)

        let body = Object.assign({fixture:_id, status:'result'}, scores)

        fetch('http://localhost:9000/api/score', post(body))
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                console.log(res)
                this.setState({progressBar:false})
                this.props.fetchData()
            })
            .catch(err=>console.log(err))
    }
    // newResultDate(newDate){
    //     this.setState({newScoreDialogOpen:false, progressBar:true})
    //     let result = this.state.resultToEdit
    //     result.date = newDate
    //     fetch(`http://localhost:9000/api/result/${result._id}`, post({date:newDate}))
    //         .then(res=>{
    //             this.setState({progressBar:false})
    //             return res
    //         })
    //         .catch(err=>console.error(err))
    // }

    render(){
        let {value} = this.state
        let {results} = this.props
        let resultGroups =     _.groupBy(results, (x)=>{
                                    return moment(x.date).format("ddd, MMM Do")
                                })
        let tabs =  Object.keys(resultGroups)
                        // .sort()
                        .map((group, index)=>(
                            <Tab 
                                key={index} 
                                label={group} 
                            />
                        ))
        let tabContent  = Object.keys(resultGroups)
                            // .sort()
                            .map((group, index)=>(
                                <ResultSet 
                                    title={group}
                                    results={resultGroups[group]} 
                                    key={index} 
                                    openNewScoreDialog={this.openNewScoreDialog.bind(this)}
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
            <NewScoreDialog 
                open={this.state.newScoreDialogOpen} 
                onClose={this.closeNewScoreDialog.bind(this)} 
                onSave={this.saveScore.bind(this)} 
                fixture={this.state.resultToEdit}
            />
            </div>
        )
    }
};

export default ResultList;