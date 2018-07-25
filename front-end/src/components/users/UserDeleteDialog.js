import React from 'react';
import {Dialog,DialogTitle,DialogActions,Button} from '@material-ui/core';


const UserDeleteDialog =(props)=>{

        return (
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <DialogTitle id="alert-dialog-title">Are you sure you want to delete {props.user.title}?</DialogTitle>
                
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                    No
                    </Button>
                    <Button onClick={props.onDelete} color="primary" autoFocus>
                    YES DELETE
                    </Button>
                </DialogActions>
            </Dialog>
    
        )

    
    
}

export default UserDeleteDialog;