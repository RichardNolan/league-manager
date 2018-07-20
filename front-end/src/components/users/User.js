import React, {Fragment} from 'react';
import { put } from '../../utilities/fetch'
import SNACK from '../../SNACK'

import {TableCell,IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create';
import Deleteicon from '@material-ui/icons/DeleteForever';
import UserEditDialog from './UserEditDialog';

class User extends React.Component {
    state={
        userEditDialogOpen:false,
    }
    openUserEditDialog = () => {
        this.setState({ userEditDialogOpen: true });
    };
    closeUserEditDialog=()=>{
        this.setState({userEditDialogOpen:false})
    }
    saveUserEdit = (user)=>{
        this.closeUserEditDialog()

        fetch('http://localhost:9000/api/user/'+user._id, put({user}))            
        .then(res=>res.json())
        .then(user=>{
            this.props.showSnack("The user has been updates")
        })
        .catch(err=>this.props.showSnack(err))
    }
    render(){
        let {user} = this.props
        return (
            <Fragment>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <IconButton color="default">                     
                        <EditIcon onClick={this.openUserEditDialog}/>
                    </IconButton>
                    <IconButton color="default">
                        <Deleteicon/>
                    </IconButton>
                </TableCell>
                
                <UserEditDialog 
                    open={this.state.userEditDialogOpen}
                    onClose={this.closeUserEditDialog.bind(this)} 
                    onSave={this.saveUserEdit.bind(this)}
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

