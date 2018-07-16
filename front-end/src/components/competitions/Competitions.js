import React, { Fragment } from 'react'
import {  post, fetchQuery } from '../../utilities/fetch'
import League from '../leagues/League'
import { Grid, LinearProgress } from '@material-ui/core';
import {Link, Route} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import CompetitionNewDialog from './CompetitionNewDialog';
import LeagueContainer from '../leagues/LeagueContainer';
import CupContainer from '../cups/CupContainer';
import NewLeague from '../leagues/NewLeague';
import PlusFab from'../PlusFab'
import ClubButton from '../clubs/ClubButton';
// import injectUser from '../../USER'


const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
})

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
        fetch('http://localhost:9000/api/competition', post(body))            
            .then(res=>res.json())
            .then(res=>{
                let competitions = [...this.state.competitions]
                competitions.push(res.competition)         
                this.setState({competitions, competition:(competitions.length-1), competition_title:res.title, isNewCompetition:true})                
            })
            .catch(err=>console.log(err))
    }
    
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){     
        this.setState({progressBar:true})   
        fetchQuery('http://localhost:9000/api/competition', {organisation:this.state.organisation})
            .then(res=>res.json())
            .then(res=>{
                if(res.error) throw(res.message)
                this.setState({competitions:res,progressBar:false})
            })
            .catch(err=>{
                console.log(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        let {classes} = this.props
        let {competition, competitions,isNewCompetition, organisation} = this.state

        // TO-DO MAKE A COMPETITIONS BUTTON THAT CAN BE SMALL OR NORMAL
        let competitionType = competition!==null && competitions[competition].type
        let competitionsMetro = competitions && competitions.length>0
                    ?   competitions.map((competition,key)=>(
                            <ClubButton 
                                organisation={organisation}
                                competition={competition}
                                size={isNewCompetition ? 'small' : 'normal'}
                                color={competition.primary_color} 
                                stripe='white' 
                                text={competition.title} 
                                component={Link} 
                                to={competition.type==='league' ? `${this.props.match.url}${competition._id}/league/` : `${this.props.match.path}${competition._id}/cup/`} 
                                key={key}
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
                            <PlusFab onSave={this.saveNewCompetition.bind(this)} dialog={CompetitionNewDialog} />  
                            {competitionsMetro}
                            <Grid container>
                                <Grid item>  
                                    { isNewCompetition && competitionType==='league' && <NewLeague competition={competitions[competition]} {...this.props}/> }
                                    { !isNewCompetition && competitionType==='league' && <LeagueContainer competition={competitions[competition]._id} {...this.props}/> }
                                    { !isNewCompetition && competitionType==='cup' && <CupContainer competition={competitions[competition]}  {...this.props}/> }
                                </Grid>
                            </Grid>
                        </Fragment>
                )} />
               
            </div>
        )
    }
    
}

export default withStyles(styles)(Competitions)
