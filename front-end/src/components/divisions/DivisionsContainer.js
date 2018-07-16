import React, { Component } from 'react';
import Divisions from './Divisions';
import {fetchQuery} from '../../utilities/fetch'

class DivisionsContainer extends Component {
    state = {  }
    componentDidMount(){
        this.getData()
    }

    componentWillUpdate(nextProps){
        if(this.props.league   &&   this.props.league._id!==nextProps.league._id) this.getData(nextProps.league._id)
    }
    render() {
        return (
            <div>
                {
                    this.state.divisions 
                        ?   <Divisions divisions={this.state.divisions} {...this.props}/>  
                        :   null 
                }
            </div>
        );
    }


    getData(newId=this.props.league._id){ 
        fetchQuery('http://localhost:9000/api/division', {league:newId})
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                this.setState({divisions:res})
            })
            .catch(err=>console.log(err))
    }

}

export default DivisionsContainer;