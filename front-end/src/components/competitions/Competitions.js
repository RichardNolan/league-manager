import React from 'react'
import {  post, fetchQuery } from '../../utilities/fetch'
import { AppBar, Toolbar,Button,Menu,MenuItem,Typography,Grid, LinearProgress } from '@material-ui/core';
import {Link} from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add';
import LeagueIcon from '@material-ui/icons/Menu';
import CupIcon from '@material-ui/icons/DeviceHub';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
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
    constructor(props){
        super(props)
        this.state = {
            newCompetitionDialogOpen:false,
            isNewCompetition:false,
            competitions:[],
            competition : null,
            competition_title: '',
            progressBar:false,
        }
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
            organisation:this.props.user.organisation
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
        fetchQuery('http://localhost:9000/api/competition', {organisation:this.props.user.organisation})
            .then(res=>res.json())
            .then(res=>{
                this.setState({competitions:res,progressBar:false})
            })
            .catch(err=>{
                console.log(err)
                this.setState({progressBar:false})
            })
    }

    render() {
        let {classes} = this.props
        let {competition, competitions,isNewCompetition} = this.state

        // TO-DO MAKE A COMPETITIONS BUTTON THAT CAN BE SMALL OR NORMAL
        let competitionType = competition!==null && competitions[competition].type
        let competitionsMetro = competitions && competitions.length>0
                    ?   competitions.map((competition,key)=>(
                            <ClubButton 
                                competition={competition}
                                size={isNewCompetition ? 'small' : 'normal'}
                                color={competition.primary_color} 
                                stripe='white' 
                                text={competition.title} 
                                component={Link} 
                                to={competition.type==='league' ? 'league/'+competition._id : '/'} 
                                key={key}
                            />
                        ))
                    :   null
        return (
            <div className={classes.root}>
                {this.state.progressBar && <LinearProgress/>}         
                <PlusFab onSave={this.saveNewCompetition.bind(this)} dialog={CompetitionNewDialog} />   
                {competitionsMetro}
                <Grid container>
                    <Grid item>  
                        { isNewCompetition && competitionType==='league' && <NewLeague competition={competitions[competition]} {...this.props}/> }
                        { !isNewCompetition && competitionType==='league' && <LeagueContainer competition={competitions[competition]._id} {...this.props}/> }
                        { !isNewCompetition && competitionType==='cup' && <CupContainer competition={competitions[competition]}  {...this.props}/> }
                    </Grid>
                </Grid>
            </div>
        )
    }
    
}

export default withStyles(styles)(Competitions)
