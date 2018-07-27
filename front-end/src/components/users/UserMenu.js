
import React from 'react';
import { MenuItem, withStyles, IconButton, Menu, TextField,InputAdornment } from '@material-ui/core';
import {KeyboardArrowDown} from '@material-ui/icons'
import { fetchQuery, URL } from '../../utilities/fetch';
import SNACK from '../../SNACK'

const styles={
    fullWidth:{
        // width:'100%',
    },
}
class UserMenu extends React.Component {
    state = {
        anchorEl: null,
        user:this.props.default || '',
        users:[]
    };
  
    openMenu = (e)=> {
      this.setState({ anchorEl: e.currentTarget });
    };
  
    handleClose = (user)=> {
        this.setState({ anchorEl: null, user });
        if(typeof user==='string') this.props.onChange(user)
    };

    lookup = id=> {
        if(this.state.users) {
            let selectedUser = this.state.users.filter(user=>user._id===id)
            if(selectedUser.length===1 && selectedUser[0].title) return selectedUser[0].title
        }
        return ''
    }
    
    componentDidMount(){
        fetchQuery(URL+'/api/user', {['is'+this.props.user]:true})
            .then(result=>result.json())
            .then(result=>{
                if(result.error) throw(result.message)
                this.setState({users:result})
            })
            .catch(err=>this.props.showSnack(err))
    }

    render(){
        const { anchorEl, users } = this.state;
        return (
            <div> 
       
       <TextField
        //   className={classNames(classes.margin, classes.textField)}
        value={this.lookup(this.state.user)}
        onChange={(e)=>this.setState({user:e.target.value})}
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton 
                        onClick={this.openMenu}
                        className={this.props.classes.fullWidth}
                    >
                        <KeyboardArrowDown/>
                    </IconButton>
                </InputAdornment>
            ),
          }}
        />
                
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={()=>this.handleClose('')} key={'x'}>{''}</MenuItem>
                    {users && users.map(user=><MenuItem onClick={()=>this.handleClose(user._id)} key={user._id}>{user.title}</MenuItem>)}
                    
                </Menu>
            </div>
        )
    }
}

// export default withStyles(styles)(UserMenu);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <UserMenu {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);
