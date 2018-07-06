import React, { Component } from 'react';
import { getRequest } from '../../utilities/fetch'

export const LoadList = (api_route='', query={}) => (Child)=>{
    return class Container extends Component {
        state = {
            list:[]
        }
    
        componentDidMount(){
            fetch('http://localhost:9000/api/'+api_route, getRequest(query))            
            .then(res=>res.json())
            .then(list=>this.setState({list}))
            .catch(err=>console.log(err))
        }
    
        render() {
            return (<Child list={this.state.list} {...this.props}/>);
        }
    }
}

export default LoadList