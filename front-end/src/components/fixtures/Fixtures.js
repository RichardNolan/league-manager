import React, { Component, Fragment } from 'react';
import {fetchQuery, post } from '../../utilities/fetch'
import FixturesNewDialog from './FixturesNewDialog';
import PlusFab from'../PlusFab'
import FixtureList from './FixtureList'

class Fixtures extends Component {
    state = {
        fixtures:[],
        progressBar:false,
    }

    componentDidMount(){
        let {division} = this.props
        this.setState({progressBar:true})
        fetchQuery('http:localhost:9000/api/fixture/', {division})
            .then(res=>res.json())
            .then(fixtures=>{
                this.setState({fixtures,progressBar:false})
            })
            .catch(err=>{
                console.error(err)
                this.setState({progressBar:false})
            })
    }

    saveNewFixtures(options){
        fetch('http://localhost:9000/api/fixture', post(options))            
            .then(res=>res.json())
            .then(fixtures=>{     
               this.setState({fixtures})
            })
            .catch(err=>console.log(err))
    }

    render() {
        return (
            <div>  
                {
                    this.state.fixtures.length===0 
                        ?   (<Fragment>
                                <PlusFab onSave={this.saveNewFixtures.bind(this)} dialog={FixturesNewDialog} division={this.props.division} />
                                <p>There are no fixtures set for this division.</p>
                            </Fragment>)
                        :   <FixtureList fixtures={this.state.fixtures} />
                }
                
            </div>
        );
    }
}

export default Fixtures;