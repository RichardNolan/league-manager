import React, { Component, Fragment } from 'react';
import {fetchQuery, DB_HOST } from '../../utilities/fetch'
import ResultList from './ResultList'
import { LinearProgress } from '@material-ui/core';
import SNACK from '../../SNACK'

import USER from '../../USER'
class Results extends Component {
    state = {
        results:[],
        progressBar:false,
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        let {division, club, competition} = this.props
        let criteria = {}
        division && (criteria.division = division)
        club && (criteria.club = club)
        competition && (criteria.competition = competition)

        this.setState({progressBar:true})
        fetchQuery(DB_HOST+'/api/result', criteria)
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
            <div>
                {this.state.progressBar && <LinearProgress/>}     

                {
                    this.state.results && this.state.results.length===0 
                        ?   (
                                <Fragment>
                                    <p>There are no results set for this division.</p>
                                </Fragment>
                            )
                        :   (                        
                                <USER.Consumer>
                                    { ( {user} )=><ResultList results={this.state.results} user={user.user} fetchData={this.fetchData.bind(this)} />}
                                </USER.Consumer>
                            )
                }
                
            </div>
        );
    }
}

// export default Results;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Results {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;