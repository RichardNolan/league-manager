import React, { Component, Fragment } from 'react';
import Teams from '../teams/Teams'
import { Route} from 'react-router-dom'
import ClubBanner from './ClubBanner'

import { LinearProgress, CardContent, Card, withStyles } from '@material-ui/core';
import SNACK from '../../SNACK'


class Club extends Component {
    state={
        id: this.props.club || this.props.match.params.club || (this.props.user && this.props.user.club) ,
        club:{},
        progressBar:false
    }
    componentDidMount(){
        this.state.id && this.fetchData()
    }

    fetchData(){  
        this.setState({progressBar:true})     
        fetch('http://localhost:9000/api/club/'+this.state.id)
            .then(res=>res.json())
            .then(res=>{
                this.setState({club:res,progressBar:false})
            })
            .catch(err=>{
                this.props.showSnack(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        let {club} = this.state
        let {classes} = this.props


        if(!this.state.id) return("You never selected your favourite club")

        return (
            <Fragment>
                {this.state.progressBar && <LinearProgress/>}
                <Card>
                    <ClubBanner club={club} />
                    <CardContent spacing={16} className={classes.nopadding}>                                         
    
                        <Route path="/club/:club/teams/" component={Teams} exact={false} />
                        <Route path="/club/:club/" exact={true} component={()=>(
                            <Teams club={club}/>
                        )} />         
                        <Route path="/:user(clubofficial|secretary|admin)/myclub/" exact={true} component={()=>(
                            <Teams club={club}/>
                        )} />             
                        <Route path="/:user(member|referee)/myclub/" exact={true} component={()=>(
                            <Teams club={club} nofab/>
                        )} />                               
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

const styles = (theme)=>( {
    nopadding:{
        padding:0,
    },
})

// export default withStyles(styles)(Club)

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Club {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);

