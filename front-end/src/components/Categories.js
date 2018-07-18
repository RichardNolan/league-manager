import React from 'react';
import { MenuItem, withStyles, Button, Menu } from '@material-ui/core';
import teamCategories from '../utilities/categories'
const styles={
    fullWidth:{
        width:'100%',
    },
}
class Categories extends React.Component {
    state = {
      anchorEl: null,
    };
  
    openMenu = (e)=> {
      this.setState({ anchorEl: e.currentTarget });
    };
  
    handleClose = (cat)=> {
        this.setState({ anchorEl: null });
        if(typeof cat==='string') this.props.onChange(cat)
    };
    render(){
        const { anchorEl } = this.state;
        return (
            <div>
                <Button onClick={this.openMenu}>
                    Category &rarr; {this.props.category}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={()=>this.handleClose('')} key={'x'}>{''}</MenuItem>
                    {teamCategories.map((cat,key)=><MenuItem onClick={()=>this.handleClose(cat)} key={key}>{cat}</MenuItem>)}
                    
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(Categories);