import React, { Fragment } from 'react'
import {  post, fetchQuery, URL } from '../../utilities/fetch'
import League from '../leagues/League'
import { Grid, LinearProgress, AppBar, Typography, Toolbar } from '@material-ui/core';
import {Link, Route} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import CompetitionNewDialog from './CompetitionNewDialog';
import NewLeague from '../leagues/NewLeague';
import PlusFab from'../PlusFab'
import ClubButton from '../clubs/ClubButton';
import SNACK from '../../SNACK'


class Competitions extends React.Component {
    state = {
            organisation:  this.props.organisation || this.props.match.params.organisationID || this.props.match.params.organisation || (this.props.user && this.props.user.organisation),
            newCompetitionDialogOpen:false,
            isNewCompetition:false,
            competitions:[],
            competition : null,
            competition_title: '',
            progressBar:false,
    }
    
    openNewCompetitionDialog = () => {
        this.setState({ newCompetitionDialogOpen: true });
    };
    closeNewCompetitionDialog = () => {
        this.setState({ newCompetitionDialogOpen: false });
    };
    
    handleOpenMenu = e=>{
        this.setState({ anchorEl: e.currentTarget });
    }

    handleCloseMenu = ()=>{
        this.setState({ anchorEl: null });
    }

    chooseCompetition = (e, index, title)=>{
        this.setState({anchorEl: null, competition:index, competition_title:title})
    }
    saveNewCompetition=(newCompetition)=>{
        this.closeNewCompetitionDialog()
        newCompetition.type = newCompetition.isLeague ? 'league' : 'cup'
        let body = {
            title:newCompetition.title,
            type:newCompetition.type,
            category:newCompetition.category,
            organisation:this.state.organisation
        }
        fetch(URL+'/api/competition', post(body))            
            .then(res=>res.json())
            .then(res=>{
                let competitions = [...this.state.competitions]
                competitions.push(res.competition)         
                this.setState({competitions, competition:(competitions.length-1), competition_title:res.title, isNewCompetition:true})                
            })
            .catch(err=>this.props.showSnack(err))
    }
    
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){     
        this.setState({progressBar:true})   
        fetchQuery(URL+'/api/competition', {organisation:this.state.organisation})
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                this.setState({competitions:res,progressBar:false})
            })
            .catch(err=>{
                this.props.showSnack(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        let {classes} = this.props
        let {competition, competitions,isNewCompetition, organisation} = this.state

        let competitionType = competition!==null && competitions[competition].type
        let competitionsMetro = competitions && competitions.length>0
                    ?   competitions.map((competition,key)=>(
                            <ClubButton  key={key}
                                organisation={organisation}
                                competition={competition}
                                size={isNewCompetition ? 'small' : 'normal'}
                                color={competition.primary_color} 
                                stripe='white' 
                                text={competition.title} 
                                component={Link} 
                                to={competition.type==='league' ? `${this.props.match.url}${competition._id}/league/` : `${this.props.match.path}${competition._id}/cup/`} 
                               
                            />
                        ))
                    :   null
        return (
            <div className={classes.root}>

                {this.state.progressBar && <LinearProgress/>}     
                

                <Route path={`${this.props.match.url}/:competition/league/`} component={League} exact={false} />
                <Route 
                    path={`${this.props.match.path}`} 
                    exact={true} 
                    component={()=>(
                        <Fragment> 
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="title" color="inherit">
                                        Competitions
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            {!isNewCompetition && <PlusFab onSave={this.saveNewCompetition.bind(this)} dialog={CompetitionNewDialog} /> }
                            <Grid container className={classes.root}> 
                                  
                            {
                                (isNewCompetition && competitionType==='league')
                                    ? <NewLeague competition={competitions[competition]} {...this.props}/>
                                    : <Fragment>{competitionsMetro ? competitionsMetro : null}</Fragment>
                            }   
                                   
                            </Grid>
                        </Fragment>
                )} />
               
            </div>
        )
    }
    
}

const styles = (theme)=>( {
   
})

// export default withStyles(styles)(Competitions)

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Competitions {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);
