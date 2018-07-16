import React, { Component } from 'react';
import { fetchQuery } from '../../utilities/fetch'

export const LoadList = (api_route='', query={}) => (Child)=>{
    return class Container extends Component {
        state = {
            list:[]
        }
    
        componentDidMount(){
            fetchQuery('http://localhost:9000/api/'+api_route,query)            
            .then(res=>res.json())
            .then(list=>{
                if(list.error) throw(list.message)
                this.setState({list})
            })
            .catch(err=>console.log(err))
        }
    
        render() {
            return (<Child list={this.state.list} {...this.props}/>);
        }
    }
}    

export default LoadList