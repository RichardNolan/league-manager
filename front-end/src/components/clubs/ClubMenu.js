import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, withStyles, Button, Menu } from '@material-ui/core';
import { fetchQuery } from '../../utilities/fetch';

const styles={
    fullWidth:{
        width:'100%',
    },
}
class ClubMenu extends React.Component {
    state = {
      anchorEl: null,
      clubs:[],
    };
  
    openMenu = (e)=> {
      this.setState({ anchorEl: e.currentTarget });
    };
  
    handleClose = (club)=> {
        this.setState({ anchorEl: null });
        if(typeof club==='string') this.props.onChange(club)
    };

    lookup = id=> {
        if(this.state.clubs) {
            let selectedClub = this.state.clubs.filter(club=>club._id===id)
            if(selectedClub.length===1 && selectedClub[0].title) return selectedClub[0].title
        }
        return ''
    }
    
    componentDidMount(){
        fetchQuery('http://localhost:9000/api/club', {organisation:this.props.organisation})
            .then(result=>result.json())
            .then(result=>{
                if(result.error) throw(result.message)
                this.setState({clubs:result})
            })
            .catch(err=>console.log(err))
    }

    render(){
        const { anchorEl, clubs } = this.state;
        return (
            <div>
                <Button onClick={this.openMenu}>
                    Club &rarr; {this.lookup(this.props.club)}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={()=>this.handleClose('')} key={'x'}>{''}</MenuItem>
                    {clubs && clubs.map(club=><MenuItem onClick={()=>this.handleClose(club._id)} key={club._id}>{club.title}</MenuItem>)}
                    
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(ClubMenu);