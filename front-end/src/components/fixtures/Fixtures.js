import React, { Component, Fragment } from 'react';
import {fetchQuery, post } from '../../utilities/fetch'
import FixturesNewDialog from './FixturesNewDialog';
import PlusFab from'../PlusFab'
import FixtureList from './FixtureList'
import { LinearProgress } from '@material-ui/core';

class Fixtures extends Component {
    state = {
        fixtures:null,
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    saveNewFixtures(options){
        fetch('http://localhost:9000/api/fixture', post(options))            
            .then(res=>res.json())
            .then(response=>{   
                response.success===true && this.fetchData() 
            //    this.setState({success})
            })
            .catch(err=>console.log(err))
    }

    fetchData(){
        let {division} = this.props
        this.setState({progressBar:true})
        fetchQuery('http:localhost:9000/api/fixture/', {division})
            .then(res=>res.json())
            .then(fixtures=>{
                if(fixtures.error) throw(fixtures.message)
                this.setState({fixtures,progressBar:false})
            })
            .catch(err=>{
                console.error(err)
                this.setState({progressBar:false})
            })
    }
    render() {
        return (
            <div style={{position:'relative'}}>  
                {this.state.progressBar && <LinearProgress/>}     
                <PlusFab onSave={this.saveNewFixtures.bind(this)} dialog={FixturesNewDialog} division={this.props.division} />
                {
                    this.state.fixtures && this.state.fixtures.length===0 
                        ?   (<Fragment>
                                <p>There are no fixtures set for this division.</p>
                            </Fragment>)
                        :   <FixtureList fixtures={this.state.fixtures} />
                }
                
            </div>
        );
    }
}

export default Fixtures;