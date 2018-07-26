import React from 'react';
import TableMain from './TableMain'
import {getStandard} from '../../utilities/fetch'
import { Paper, LinearProgress, Typography,FormControlLabel,Tooltip,Switch} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import SNACK from '../../SNACK'


class LeagueTable extends React.Component {
    state = {
        full:false,
        size: this.getSizeFromWidth(),
        teams:[],
        progressBar:false,
    }

    changeSwitch = (e)=>{
        let newSize = e.target.checked ? 4 : this.getSizeFromWidth()
        this.setState({full: e.target.checked, size:newSize})
    }
    componentDidMount(){
        this.fetchData()
        window.addEventListener('resize', this.changeWidth)
        // SE PRJECT BOOKMARKS FOR REASON
        // window.addEventListener('resize', this.changeWidth.bind(this))
    }

    getSizeFromWidth(){
        let innerWidth = Math.floor((window.innerWidth))
        if(innerWidth<320) return 0
        else if(innerWidth<360) return 1
        else if(innerWidth<450) return 2
        else if(innerWidth<1200) return 3
        else return 4
    }

    changeWidth = ()=>{
        let s = this.getSizeFromWidth()
        this.state && this.state.size!==s && this.setState({size:s})
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.changeWidth)
    }
    fetchData(){
        this.setState({progressBar:true})
        fetch(`http://localhost:9000/api/division/${this.props.division}`, getStandard())
            .then(res=>res.json())
            .then(res=>{     
                let leagueData = res.table.table
                                    .filter(t=>{                
                                        if(this.props.filter) return this.props.filter===t.team ? true : false
                                        return true
                                    })      
                leagueData.map(t=>{
                        let team = res.teams.find(tm=>tm._id===t.team)
                        team && (t.title = team.club.title_short)    
                        return t
                    })
                
                //THIS IS THE FALLBACK IF NO FIXTURES HAVE BEEN PLAYED HENSE NO TABLE 
                if(leagueData.length===0){
                    leagueData = res.teams.map((t,i)=>({id:t._id,team:t.club.title_short,p:0, w:0, d:0, l:0, f:0, a:0, gd:0, pts:0}))
                                        .filter(t=>{                
                                            if(this.props.filter) return this.props.filter===t.id ? true : false
                                            return true
                                        })      
                }

                this.setState({teams:leagueData,progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                this.props.showSnack(err)
            })
    }

    render(){
        let size = this.props.size ? ['tiny', 'small', 'medium', 'large', 'full'].indexOf(this.props.size) : this.state.size 
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    {this.props.title || null}
                </Typography>
                {this.state.progressBar && <LinearProgress/>}

                <Paper className={this.props.classes.root}>
                { (this.getSizeFromWidth()!==4) &&
                                <FormControlLabel control={
                                                        <Tooltip id="tooltip-icon" title="See the full table, with home and away details, form, etc.">
                                                            <Switch
                                                                checked={this.state.full}
                                                                onChange={this.changeSwitch}
                                                                color="primary"
                                                            />
                                                        </Tooltip>
                                                        }
                                    label="See a full table"
                                />
                }
                        <TableMain size={size} teams={this.state.teams} />
                </Paper>
            </div>
        )
                
                
    }
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
});
// export default withStyles(styles)(LeagueTable);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <LeagueTable {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);