import React, { Component } from 'react';
import Divisions from './Divisions';
import {fetchQuery} from '../../utilities/fetch'
import SNACK from '../../SNACK'

class DivisionsContainer extends Component {
    state = {  }
    componentDidMount(){
        this.getData()
    }


    getData(newId=this.props.league._id){ 
        fetchQuery('http://localhost:9000/api/division', {league:newId})
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                this.setState({divisions:res})
            })
            .catch(err=>this.props.showSnack(err))
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

}

// export default DivisionsContainer;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <DivisionsContainer {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;