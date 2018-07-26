import React, { Fragment } from 'react';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@material-ui/core'
import User from './User'
import { fetchQuery } from '../../utilities/fetch';
import SNACK from '../../SNACK'


// when I changea user in the User component, it doesn't update in any state anywhere above the dialog as its all props.
// This component needs to be a class with state for users, maybe remove HOC and load users directly here and place in state for everyone else.
// pass all changes back up to here to filter back down.
///  ******* SHOULD HAVE USED REDUX - maybe *******************

// + this breaks when I browse away and back

class Users extends React.Component {
    state= {
        user: this.props.user || {},
        users:[],
    }

    componentDidMount(){
        this.fetchUsers()
    }

    fetchUsers(){
        let query = {}
        if(this.state.user.isLeagueSecretary) query.organisation = this.state.user.organisation 
        fetchQuery('http://localhost:9000/api/user/', query)
            .then(res=>res.json())
            .then(users=>{
                if(users.error) throw(users.message)
                this.setState({users})
            })
            .catch(err=>this.props.showSnack(err))
    }

    render(){
        let userList = this.state.users ?   this.state.users.map((user, key)=>(
                                            <TableRow key={key}>
                                                <User user={user} onUpdate={this.fetchUsers.bind(this)}/>
                                            </TableRow>
                                        ))
                                    :   []

        return (
            <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList}
                </TableBody>
            </Table>
            </Fragment>
        );
    }
};

// export default Users;

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <Users {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withSnack;