import React, {Fragment} from 'react';
import {Dialog,DialogTitle,DialogActions,Button} from '@material-ui/core';


const DeleteCompetitionDialog = (props)=>{

        return (
            <Fragment> 
                <Dialog
                    open={props.open}
                    onClose={props.onClose}
                >
                <DialogTitle id="alert-dialog-title">Are you sure you want to delete this competition?</DialogTitle>
                
                <DialogActions>
                    <Button onClick={props.onClose} color="default">
                        No
                    </Button>
                    <Button onClick={props.onConfirm} color="secondary" autoFocus variant="contained">
                        Yes Delete the League
                    </Button>
                </DialogActions>
                </Dialog>
    
            </Fragment>
        );
    
}

export default DeleteCompetitionDialog;