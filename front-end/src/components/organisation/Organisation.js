import React, { Component, Fragment } from 'react';
import { getStandard } from '../../utilities/fetch'

import {Link, Route} from 'react-router-dom'
import CompetitionsPanel from '../competitions/CompetitionsPanel';
import ClubsPanel from '../clubs/ClubsPanel';
import Clubs from '../clubs/Clubs';
// import RefereesPanel from '../referees/RefereesPanel';
import { Grid, LinearProgress } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles'
import Competitions from '../competitions/Competitions';

const styles = {
    flex:{
        display:'flex',
    },
    progress:{
        justifyContent:'center',
    }
}

class Organisation extends Component {
    state={
        loader:false,
        id: (this.props.user && this.props.user.organisation) || this.props.organisation || this.props.match.params.organisationID,
        organisation:{
            competitions:[],
            clubs:[],
            users:[],
            referees:[],
            title:'',
        }, 
    }

    fetchData(){   
        this.setState({loader:true})     
        fetch('http://localhost:9000/api/organisation/'+this.state.id, getStandard())            
        .then(res=>res.json())
        .then(organisation=>this.setState({organisation, loader:false}))
        .catch(err=>{
            console.log(err)
            this.setState({loader:false})   
        })
    }

    componentDidMount(){
        this.fetchData()
    }

    componentDidUpdate(prevProps) {
        if(prevProps._id!==this.props._id) this.fetchData();
      }

    render() {
        let org = this.state.organisation
        return (
            <Fragment>
                {this.state.loader ? <LinearProgress /> : null }
                <Route path={`${this.props.match.path}/competitions/`} component={Competitions} exact={false} />
                <Route path={`${this.props.match.path}/clubs/`} component={Clubs} exact={false} />
                {/* <Route path="/organisations/:organisation/clubs/" component={Clubs} exact={false} /> */}
                <Route path={`${this.props.match.path}`} exact={true} component={()=>(
                    <Grid container spacing={32}>
                        <Grid item sm={12} md={6}>
                            <CompetitionsPanel competitions={org.competitions} title={org.title}/>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <ClubsPanel clubs={org.clubs} title={org.title}/>
                        </Grid>
                    </Grid>
                )} />
            </Fragment>
        );
    }
}

export default withStyles(styles)(Organisation);