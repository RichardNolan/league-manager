import React, { Component } from 'react';
import { post, fetchQuery } from '../../utilities/fetch'
import { Grid, LinearProgress, CardHeader, CardContent, Card, Avatar } from '@material-ui/core';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ClubNewDialog from './ClubNewDialog';
import PlusFab from'../PlusFab'
import ClubButton from './ClubButton';
import SNACK from '../../SNACK'


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
            .catch(err=>this.props.showSnack(err))
    }
    
    fetchData(){   
        let {organisation} = this.state
        fetchQuery('http://localhost:9000/api/club', { organisation} )
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                this.setState({clubs:res})
            })
            .catch(err=>{
                this.props.showSnack(err)
            })
    }

    render() {
        let {classes} = this.props
        let {clubs} = this.state

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
            <PlusFab onSave={this.saveNewClub.bind(this)} dialog={ClubNewDialog}/>
    
            <Grid container spacing={32}>
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
                <Grid item xs={12} sm={10} md={8} lg={6} > 

                   <Card>
                        <CardHeader
                            avatar={
                                    <Avatar>C</Avatar>
                            }
                            title="Clubs"
                            subheader="These are the clubs in your organisation"
                        />
                        <CardContent className={classes.nopadding}>
                            <Grid container alignContent='space-around'>
                                {clubsMetro}     
                            </Grid>                      
                        </CardContent>
                    </Card>
                </Grid>                
                <Grid item xs={12} sm={1} md={2} lg={3}></Grid>
            </Grid>
        </div>
        );
    }

}

const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
    nopadding:{
        padding:0,
    },

})

// export default withStyles(styles)(Clubs);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Clubs {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);

