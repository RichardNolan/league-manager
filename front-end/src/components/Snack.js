import React, { Component, Fragment } from 'react';
import { Snackbar } from '@material-ui/core';

class Snack extends Component {

    close(){
        this.props.onClose()
    }

    render() {
        let message =  this.props.message || ''
        return (
            <Fragment>                
                <Snackbar
                    anchorOrigin={{vertical:'top', horizontal:'center'}}
                    open={this.props.open}
                    onClose={this.close.bind(this)}
                    autoHideDuration={3000}
                    message={message}
                />      
            </Fragment>
        );
    }
}

export default Snack;