import React, { Fragment } from 'react'
import Organisation from './Organisation'
import { post, getStandard} from '../../utilities/fetch'
import {Link, Route} from 'react-router-dom'

import { Grid, LinearProgress, CardHeader, CardContent, Card, Avatar } from '@material-ui/core';
import SNACK from '../../SNACK'


import { withStyles } from '@material-ui/core/styles';
import OrganisationNewDialog from './OrganisationNewDialog';
import PlusFab from'../PlusFab'
import ClubButton from '../clubs/ClubButton';

class Organisations extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            anchorEl:null,
            newOrganisationDialogOpen:false,
            organisations: [],
            organisation:null,
        }
    }
   
    openNewOrganisationDialog = () => {
        this.setState({ newOrganisationDialogOpen: true });
    };
    closeNewOrganisationDialog = () => {
        this.setState({ newOrganisationDialogOpen: false });
    };
    
    handleOpenMenu = e=>{
        this.setState({ anchorEl: e.currentTarget });
    }

    handleCloseMenu = ()=>{
        this.setState({ anchorEl: null });
    }

    chooseOrganisation = (e, _id, title)=>{
        this.setState({organisation_id:_id, organisation_title:title})
        this.handleCloseMenu()
    }
    saveNewOrganisation=(title)=>{
        this.closeNewOrganisationDialog()        
        fetch('http://localhost:9000/api/organisation', post({title}))            
        .then(res=>res.json())
        .then(newOrganisation=>{
            let organisations = [...this.state.organisations]
            organisations.push(newOrganisation)            
            this.setState({organisations}) 
        })
        .catch(err=>this.props.showSnack(err))
    }
    componentDidMount(){
        fetch('http://localhost:9000/api/organisation', getStandard())            
        .then(res=>res.json())
        .then(organisations=>this.setState({organisations}))
        .catch(err=>this.props.showSnack(err))   
    }

    render() {
        let {classes} = this.props
        let {organisations} = this.state
        // let organisations = this.state.organisations.map((org, key)=> <MenuItem key={key} onClick={e=>this.chooseOrganisation(e, org._id, org.title)} >{org.title}</MenuItem>)
        
        let organisationsMetro = organisations && organisations.length>0
                    ?   organisations.map((organisation,key)=>(
                            <ClubButton 
                                organisation={organisation}
                                color='blue' 
                                stripe='white' 
                                text={organisation.title} 
                                component={Link} 
                                to={`${this.props.match.path}${organisation._id}/`} 
                                key={key}
                            />
                        ))
                    :   null

        return (
            <div className={classes.root}> 
                {this.state.progressBar && <LinearProgress/>}         


                <Route path={`${this.props.match.path}:organisationID`} component={Organisation} exact={false} />
                <Route 
                    path={`${this.props.match.path}`} 
                    exact={true} 
                    component={()=>(
                    <Fragment>
                        <PlusFab onSave={this.saveNewOrganisation.bind(this)} dialog={OrganisationNewDialog}  /> 
                            <Grid container spacing={16}>
                                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                                <Grid item xs={12} sm={10} md={8} lg={6} > 
                                    <Card>
                                        <CardHeader
                                            avatar={
                                                <Avatar>O</Avatar>
                                            }
                                            title="Organisations"
                                            subheader="These are the different organisations in the application"
                                        />
                                        <CardContent spacing={16} className={classes.nopadding}>
                                            <Grid container alignContent='space-around'> 
                                                {organisationsMetro}     
                                            </Grid>                      
                                        </CardContent>
                                    </Card>
                                </Grid>                
                                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                            </Grid>
                    </Fragment>
                )} />
               

            </div>
        )
    }
  
}

const styles = (theme)=>( {
    root: {
      flexGrow: 1,
    },
    flex:{
        flex:1,        
        justifyContent: 'spaceBetween',
    },
    nopadding:{
        padding:0,
    },
    fab: {
      right: theme.spacing.unit * 2,
      zIndex: theme.zIndex.tooltip,
    },
})

// export default withStyles(styles)(Organisations)

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Organisations {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);




