import React, { Component, Fragment } from 'react';
import League from "./League";
import {fetchQuery} from '../../utilities/fetch'

class LeagueContainer extends Component {
    constructor(props){
        super(props)
        this.state = { 
            league:null 
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    componentWillUpdate(nextProps, nextState){
        if(this.state.league   &&   this.state.league.competition!==nextProps.competition) this.getData(nextProps.competition)
    }
    render() {
        return (
            <Fragment>
                {this.state.league ? <League league={this.state.league} /> : null}
            </Fragment>
        );
    }



    fetchData(newComp=this.props.competition){
        fetchQuery('http://localhost:9000/api/league/', {competition:newComp})
            .then(res=>res.json())
            .then(res=>{
                if(res){
                    if(res.error) throw(res.message)
                    this.setState({league:res[0]}) // SHOULD ONLY BE ONE HENSE [0]
                    return res[0]
                }else{
                    this.setState({league:null})
                }
            })
            .catch(err=>console.log(err))
    }




}

export default LeagueContainer;