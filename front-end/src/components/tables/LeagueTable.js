import React from 'react';
import TableMain from './TableMain'
import {getStandard} from '../../utilities/fetch'
import { Paper, LinearProgress, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'


class LeagueTable extends React.Component {
    state = {
        size: this.getSizeFromWidth(),
        teams:[],
        progressBar:false,
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
        else if(innerWidth>=450) return 3
    }

    changeWidth = ()=>{
        let s = this.getSizeFromWidth()
        this.state && this.state.size!==s && this.setState({size:s})
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.changeWidth)
        // window.removeEventListener('resize', this.changeWidth.bind(this))
    }
    fetchData(){
        this.setState({progressBar:true})
        fetch(`http://localhost:9000/api/division/5b47ccab658a78217440a3cc`, getStandard())
            .then(res=>res.json())
            .then(res=>{
                let leagueData = res.table.table
                                    .filter(t=>{                        
                                        if(this.props.filter) return this.props.filter===t.team ? true : false
                                        return true
                                    })

                leagueData.map(t=>{
                        t.team = res.teams.find(tm=>tm._id===t.team).club.title_short
                        return t
                    })
                this.setState({teams:leagueData,progressBar:false})
            })
            .catch(err=>{
                this.setState({progressBar:false})
                console.log(err)
            })
    }

    render(){
        let size = this.props.size ? ['tiny', 'small', 'medium', 'large', 'full'].indexOf(this.props.size) : this.props.size || this.state.size 
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    {this.props.title || null}
                </Typography>
                {this.state.progressBar && <LinearProgress/>}
                <Paper className={this.props.classes.root}>
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
export default withStyles(styles)(LeagueTable);