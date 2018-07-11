import React, { Component } from 'react';
import { post, fetchQuery } from '../../utilities/fetch'
import { Grid, LinearProgress } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ClubNewDialog from './ClubNewDialog';
import PlusFab from'../PlusFab'
import ClubButton from './ClubButton';

const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
    },

})

class Clubs extends Component {
    state={
        clubs:[],
        newClubDialogOpen: false,
        organisation:  this.props.organisation || this.props.match.params.organisationID || (this.props.user && this.props.user.organisation),
    }
    
    componentDidMount(){
        this.fetchData()
    }

    openNewClubDialog = () => {
        this.setState({ newClubDialogOpen: true });
    };
    closeNewClubDialog = () => {
        this.setState({ newClubDialogOpen: false });
    };
    
    saveNewClub = (newClub)=>{
        this.closeNewClubDialog()
        let body = {
            title: newClub.title,
            title_short: newClub.title_short,
            crest: newClub.crest,
            primary_color: newClub.primary_color,
            secondary_color: newClub.secondary_color,
            organisation: this.state.organisation
        }
        fetch('http://localhost:9000/api/club', post(body))            
            .then(res=>res.json())
            .then(res=>{
                let clubs = [...this.state.clubs]
                clubs.push(res)         
                this.setState({clubs, club_title:res.title})                
            })
            .catch(err=>console.log(err))
    }
    
    fetchData(){   
        let {organisation} = this.state
        fetchQuery('http://localhost:9000/api/club', { organisation} )
            .then(res=>res.json())
            .then(res=>{
                this.setState({clubs:res})
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        let {classes} = this.props
        let {clubs} = this.state

        // let clubsMetro = clubs && clubs.length>0
        //             ?   clubs.map((club,key)=>(
        //                     <Button component={Link} to={club._id} key={key}>
        //                         {club.title}
        //                     </Button>
        //                 ))
        //             :   <LinearProgress />

        let clubsMetro = clubs && clubs.length>0
                    ?   clubs.map((club,key)=>(
                            <ClubButton 
                                color={club.primary_color || 'red'} 
                                stripe={club.secondary_color || 'white'} 
                                text={club.title} 
                                component={Link} 
                                to={`/club/${club._id}`} 
                                key={key}
                            />
                        ))
                    :   <LinearProgress />
        return (
            <div className={classes.root}>                
            <PlusFab onSave={this.saveNewClub.bind(this)} dialog={ClubNewDialog} />
  
            <Grid container>
                <Grid item>   
                   {clubsMetro}
                </Grid>
            </Grid>
        </div>
        );
    }

}

export default withStyles(styles)(Clubs);



// <Zoom
// in={this.state.showFab}
// unmountOnExit
// >
// <Button variant="fab" color="secondary" className={classes.fab} onClick={this.openNewClubDialog} >
//     <AddIcon/>
// </Button>
// </Zoom>

// <ClubNewDialog 
// open={this.state.newClubDialogOpen}
// onClose={this.closeNewClubDialog.bind(this)} 
// onSave={this.saveNewClub.bind(this)}
// />