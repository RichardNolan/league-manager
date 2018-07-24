import React, { Component, Fragment } from 'react';
import {fetchQuery} from '../../utilities/fetch'
// import FixturesNewDialog from './FixturesNewDialog';
import FixtureList from '../fixtures/FixtureList'
import { LinearProgress } from '@material-ui/core';
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
        // let {division} = this.props
        // this.setState({progressBar:true})
        // fetchQuery('http:localhost:9000/api/fixture/', {division})
        //     .then(res=>res.json())
        //     .then(fixtures=>{
        //         if(fixtures.error) throw(fixtures.message)
        //         this.setState({fixtures,progressBar:false})
        //     })
        //     .catch(err=>{
        //         this.props.showSnack(err)
        //         this.setState({progressBar:false})
        //     })
    }
    render() {
        return (
            <div style={{position:'relative'}}>  
                {this.state.progressBar && <LinearProgress/>}     
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

// export default Fixtures;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <RefereeFixtures {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;