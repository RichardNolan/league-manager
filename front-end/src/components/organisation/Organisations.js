import React, { Fragment } from 'react'
import Organisation from './Organisation'
import { post, getStandard, URL} from '../../utilities/fetch'
import {Link, Route} from 'react-router-dom'

import { Grid, LinearProgress, Avatar, AppBar, Toolbar, Typography  } from '@material-ui/core';
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
        fetch(URL+'/api/organisation', post({title}))            
        .then(res=>res.json())
        .then(newOrganisation=>{
            let organisations = [...this.state.organisations]
            organisations.push(newOrganisation)            
            this.setState({organisations}) 
        })
        .catch(err=>this.props.showSnack(err))
    }
    componentDidMount(){
        fetch(URL+'/api/organisation', getStandard())            
        .then(res=>res.json())
        .then(organisations=>this.setState({organisations}))
        .catch(err=>this.props.showSnack(err))   
    }

    render() {
        let {classes} = this.props
        let {organisations} = this.state
        // let organisations = this.state.organisations.map((org, key)=> <MenuItem key={key} onClick={e=>this.chooseOrganisation(e, org._id, org.title)} >{org.title}</MenuItem>)
        
        let path = (this.props.match && this.props.match.path) || "/organisations/"

        let organisationsMetro = organisations && organisations.length>0
                    ?   organisations.map((organisation,key)=>(
                            <ClubButton 
                                organisation={organisation}
                                color='blue' 
                                stripe='white' 
                                text={organisation.title} 
                                component={Link} 
                                to={`${path}${organisation._id}/`} 
                                key={key}
                            />
                        ))
                    :   null
        return (
            <div className={classes.root}> 
                {this.state.progressBar && <LinearProgress/>}         


                <Route path={`${path}:organisationID`} component={Organisation} exact={false} />
                <Route 
                    path={`${path}`} 
                    exact={true} 
                    component={()=>(
                            <Fragment>  
                            <AppBar position="static">
                                <Toolbar>
                                    <Avatar className={classes.avatar} >O</Avatar>
                                    <Typography variant="title" color="inherit">
                                        Organisations
                                    </Typography>
                                </Toolbar>
                            </AppBar>              
                                <PlusFab onSave={this.saveNewOrganisation.bind(this)} dialog={OrganisationNewDialog}  /> 
                                
                        
                                <Grid container alignContent='space-around'> 
                                    {organisationsMetro}     
                                </Grid> 
                    
                            </Fragment>
                )} />
               

            </div>
        )
    }
  
}

const styles = (theme)=>( {
    avatar:{
        marginRight: theme.spacing.unit*2,
    },
    root: {
      flexGrow: 1,
    },
    flex:{
        flex:1,        
        justifyContent: 'spaceBetween',
    },
})

// export default withStyles(styles)(Organisations)

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Organisations {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);




