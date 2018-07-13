import React, { Component } from 'react';
import {fetchQuery} from '../../utilities/fetch'

class Results extends Component {
    state = {
        results:[],
        progressBar:false,
    }

    componentDidMount(){
        let {division} = this.props
        this.setState({progressBar:true})
        fetchQuery('http:localhost:9000/api/results/', {division})
            .then(res=>res.json())
            .then(results=>{
                this.setState({results,progressBar:false})
            })
            .catch(err=>{
                console.error(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        return (
            <div>
                Results
            </div>
        );
    }
}

export default Results;