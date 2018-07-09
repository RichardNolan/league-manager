import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, withStyles, Button, Menu } from '@material-ui/core';
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




            //  <FormControl className={props.classes.fullWidth} >
            //     {/* TO-DO this label doesn't work the first time the dialog opens cos the id isn't in the dom, it works on subsequent turns */}
            //     <InputLabel htmlFor="category">Select Team Category</InputLabel>
            //     <Select
            //         value={props.category}
            //         onChange={props.onChange.bind(this)}
            //         inputProps={{name: 'category', id:'category'}}
            //     >
            //         { teamCategories.map((cat, key)=> <MenuItem key={key}>{cat}</MenuItem>) }   
            //     </Select>
            // </FormControl>