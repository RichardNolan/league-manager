import React, {Fragment} from 'react';
import { put, del } from '../../utilities/fetch'
import SNACK from '../../SNACK'

import {TableCell,IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create';
import Deleteicon from '@material-ui/icons/DeleteForever';
import UserEditDialog from './UserEditDialog';
import UserDeleteDialog from './UserDeleteDialog';

class User extends React.Component {
    state={
        userEditDialogOpen:false,
        userDeleteDialogOpen:false,
        progressBar:false
    }
    openUserEditDialog = () => {
        this.setState({ userEditDialogOpen: true });
    };
    openUserDeleteDialog = () => {
        this.setState({ userDeleteDialogOpen: true });
    };
    closeDialogs=()=>{
        this.setState({userEditDialogOpen:false, userDeleteDialogOpen: false})
    }

    saveUserEdit = (user)=>{  
        this.setState({progressBar:true})  
        this.closeDialogs()

        fetch('http://localhost:9000/api/user/'+user._id, put({user}))            
        .then(res=>res.json())
        .then(user=>{
            this.setState({progressBar:false})   
            this.props.showSnack("The user has been updates")
        })
        .catch(err=>{  
            this.setState({progressBar:false})  
            this.props.showSnack(err)
        })
    }

    
    deleteUser = ()=>{        
        this.setState({progressBar:true})   
        this.closeDialogs()

        fetch('http://localhost:9000/api/user/'+this.props.user._id, del())
            .then(res=>res.json())
            .then(res=>{
                if(!res) throw(res.message)
                return res
            })
            .then(res=>{
                this.setState({progressBar:false})  
                this.props.onUpdate()
            })
            .catch(err=>{
                this.setState({progressBar:false})  
                this.props.showSnack(err)
            })
    }

    render(){
        let {user} = this.props
        return (
            <Fragment>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <IconButton color="default" onClick={this.openUserEditDialog}>                     
                        <EditIcon/>
                    </IconButton>
                    <IconButton color="default" onClick={this.openUserDeleteDialog}>
                        <Deleteicon/>
                    </IconButton>
                </TableCell>
                
                <UserEditDialog 
                    open={this.state.userEditDialogOpen}
                    onClose={this.closeDialogs.bind(this)} 
                    onSave={this.saveUserEdit.bind(this)}
                    user={user}
                />
                <UserDeleteDialog 
                    open={this.state.userDeleteDialogOpen}
                    onClose={this.closeDialogs.bind(this)} 
                    onDelete={this.deleteUser.bind(this)}
                    user={user}
                />

            </Fragment>
        );
    };
}
// export default User;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <User {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;

