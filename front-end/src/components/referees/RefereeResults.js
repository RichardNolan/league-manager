import React, { Component, Fragment } from 'react';
import {fetchQuery, DB_HOST} from '../../utilities/fetch'
import ResultList from '../results/ResultList'
import { LinearProgress, Card } from '@material-ui/core';
import SNACK from '../../SNACK'

class RefereeResults extends Component {
    state = {
        results:null,
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        this.setState({progressBar:true})
        fetchQuery(DB_HOST+'/api/result/', {referee:this.props.user._id})
            .then(res=>res.json())
            .then(results=>{
                if(results.error) throw(results.message)
                this.setState({results,progressBar:false})
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
                    this.state.results && this.state.results.length===0 
                        ?   (<Fragment>
                                <Card><p>You don't appear to have any upcoming results</p></Card>
                            </Fragment>)
                        :   <ResultList results={this.state.results} />
                }
                
            </div>
        );
    }
}

// export default Results;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <RefereeResults {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;