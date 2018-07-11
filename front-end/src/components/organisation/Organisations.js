import React, { Fragment } from 'react'
import Organisation from './Organisation'
import { post, getStandard} from '../../utilities/fetch'
import {Link, Route} from 'react-router-dom'

import { LinearProgress } from '@material-ui/core';


import { withStyles } from '@material-ui/core/styles';
import OrganisationNewDialog from './OrganisationNewDialog';
import PlusFab from'../PlusFab'
import ClubButton from '../clubs/ClubButton';

const styles = (theme)=>( {
    root: {
      flexGrow: 1,
    },
    flex:{
        flex:1,        
        justifyContent: 'spaceBetween',
    },
    fab: {
      right: theme.spacing.unit * 2,
      zIndex: theme.zIndex.tooltip,
    },
})

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
        .catch(err=>console.log(err))
    }
    componentDidMount(){
        fetch('http://localhost:9000/api/organisation', getStandard())            
        .then(res=>res.json())
        .then(organisations=>this.setState({organisations}))
        .catch(err=>console.log(err))   
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
                        {organisationsMetro}
                    </Fragment>
                )} />
               

            </div>
        )
    }
  
}

export default withStyles(styles)(Organisations)







// <AppBar position="static" color="default">
// <Toolbar>
//     <Button onClick={this.handleOpenMenu} variant="fab" mini color="primary">
//         <ArrowDropDown/>
//     </Button>
//     <Menu
//         anchorEl={this.state.anchorEl}
//         open={Boolean(this.state.anchorEl)}
//         onClose={this.handleClose}
//     >
//         {organisations}
//     </Menu>
   
//     <Typography variant="headline" color="inherit">
//         {this.state.organisation_title || "Choose an Organisation"}
//     </Typography>
//     <div>
//         <Button variant="fab" color="secondary">
//             <AddIcon onClick={this.openNewOrganisationDialog}/>
//         </Button>
//         <OrganisationNewDialog 
//             open={this.state.newOrganisationDialogOpen}
//             onClose={this.closeNewOrganisationDialog.bind(this)} 
//             onSave={this.saveNewOrganisation.bind(this)}
//         />
//     </div>
// </Toolbar>
// </AppBar>
// <Grid container>
// <Grid item>
// {this.state.organisation_id && (
//     <Organisation _id={this.state.organisation_id} />
// )}
// </Grid>
// </Grid>