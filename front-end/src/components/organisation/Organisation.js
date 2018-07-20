import React, { Component, Fragment } from 'react';
import { getStandard } from '../../utilities/fetch'

import {Route} from 'react-router-dom'
import CompetitionsPanel from '../competitions/CompetitionsPanel';
import ClubsPanel from '../clubs/ClubsPanel';
import Clubs from '../clubs/Clubs';
// import RefereesPanel from '../referees/RefereesPanel';
import { Grid, LinearProgress, Typography } from '@material-ui/core';

import withStyles from '@material-ui/core/styles/withStyles'
import Competitions from '../competitions/Competitions';
import SNACK from '../../SNACK'

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
            this.props.showSnack(err)
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
                {this.state.organisation 
                    ? <Typography variant='headline' className={this.props.classes.center} >{this.state.organisation.title}</Typography> 
                    : null 
                }
                <Route path={`${this.props.match.path}/competitions/`} component={Competitions} exact={false} />
                <Route path={`${this.props.match.path}/clubs/`} component={Clubs} exact={false} />
                {/* <Route path="/organisations/:organisation/clubs/" component={Clubs} exact={false} /> */}
                <Route path={`${this.props.match.path}`} exact={true} component={()=>(
                    <Grid container spacing={32}>
                        <Grid item xs={12} sm={12} md={6}>
                            <CompetitionsPanel competitions={org.competitions} title={org.title}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <ClubsPanel clubs={org.clubs} title={org.title}/>
                        </Grid>
                    </Grid>
                )} />
            </Fragment>
        );
    }
}

const styles = {
    flex:{
        display:'flex',
    },
    center:{
        textAlign:'center',
    }
}

// export default withStyles(styles)(Organisation);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Organisation {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);