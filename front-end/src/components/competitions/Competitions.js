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
        fetchQuery('http://localhost:9000/api/competition', {organisation:this.props.user.organisation})
            .then(res=>res.json())
            .then(res=>{
                this.setState({competitions:res})
            })
            .catch(err=>{
                console.log(err)
            })
    }

    render() {
        let {classes} = this.props
        let {competition, competitions,isNewCompetition} = this.state

        // let competitionsMenuItems =  competitions.map((competition, key)=>(
        //     <MenuItem key={key} 
        //         onClick={e=>this.chooseCompetition(e, key, competition.title)} 
        //     >
        //         {competition.type === 'league' ? <LeagueIcon/> : <CupIcon/>}
        //         {competition.title}
        //     </MenuItem>
        // ))

        // TO-DO MAKE A COMPETITIONS BUTTON THAT CAN BE SMALL OR NORMAL
        let competitionType = competition!==null && competitions[competition].type
        console.log('competitionType', competitionType)
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
                    :   <LinearProgress />
        return (
            <div className={classes.root}>         
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
{/* <AppBar position="static" color="default">
    <Toolbar>
        <Button onClick={this.handleOpenMenu} variant="fab" mini color="primary">
            <ArrowDropDown/>
        </Button>
        <Menu
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
        >
            {competitionsMenuItems}
        </Menu>
        
        <Typography variant="headline" color="inherit">
            {this.state.competition_title || "Choose an Competition"}
        </Typography>
        <div>
            <Button variant="fab" color="secondary">
                <AddIcon onClick={this.openNewCompetitionDialog}/>
            </Button>
            <CompetitionNewDialog 
                open={this.state.newCompetitionDialogOpen}
                onClose={this.closeNewCompetitionDialog.bind(this)} 
                onSave={this.saveNewCompetition.bind(this)}
            />
        </div>
    </Toolbar>
</AppBar>   */}