import React, { Fragment } from 'react';
import {Table,TableHead,TableBody,TableFooter,TableRow,TableCell} from '@material-ui/core'
import User from './User'


// when I changea user in the User component, it doesn't update in any state anywhere above the dialog as its all props.
// This component needs to be a class with state for users, maybe remove HOC and load users directly here and place in state for everyone else.
// pass all changes back up to here to filter back down.
///  ******* SHOULD HAVE USED REDUX - maybe *******************

// + this breaks when I browse away and back

const Users = (props) => {
     let userList = props.list ?   props.list.map((user, key)=>(
                                        <TableRow key={key}>
                                            <User user={user} />
                                        </TableRow>
                                    ))
                                :   []

    // TO-DO POSSIBLY SOME PAGINATION HERE
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
            <TableFooter>
            <TableRow>
                <TableCell colSpan={6}>{'footer'}</TableCell>
            </TableRow>
            </TableFooter>
        </Table>
        </Fragment>
    );
};

export default Users;