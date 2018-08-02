import React, { Component, Fragment } from 'react';
import {fetchQuery, DB_HOST } from '../../utilities/fetch'
import FixtureList from '../fixtures/FixtureList'
import { LinearProgress, Card } from '@material-ui/core';
import SNACK from '../../SNACK'

class RefereeFixtures extends Component {
    state = {
        fixtures:null,
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})
        fetchQuery(DB_HOST+'/api/fixture/', {referee:this.props.user._id})
            .then(res=>res.json())
            .then(fixtures=>{
                if(fixtures.error) throw(fixtures.message)
                this.setState({fixtures,progressBar:false})
            })
            .catch(err=>{
                this.props.showSnack(err)
                this.setState({progressBar:false})
            })
    }
    render() {
        return (
            <div style={{position:'relative'}}>  
                {this.state.progressBar && <LinearProgress/>}     
                {
                    this.state.fixtures && this.state.fixtures.length===0 
                        ?   (<Fragment>
                                <Card><p>You don't appear to have any upcoming fixtures</p></Card>
                            </Fragment>)
                        :   <FixtureList fixtures={this.state.fixtures} />
                }
                
            </div>
        );
    }
}

// export default Fixtures;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <RefereeFixtures {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;