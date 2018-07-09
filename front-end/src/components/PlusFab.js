import React, { Component, Fragment } from 'react';
import { Zoom, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme)=>( {
    root: {
        flexGrow: 1,
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
    },

})

class PlusFab extends Component {

    state={
        open:false
    }
    open(){
        this.setState({open:true})
    }
    close(){
        this.setState({open:false})
    }
    save(item){
        this.setState({open:false})
        this.props.onSave(item)
    }
    render() {
        let PromptDialog = this.props.dialog
        return (
            <Fragment>
                
                <Zoom
                    in={true}
                    unmountOnExit
                >
                    <Button variant="fab" color="secondary" className={this.props.classes.fab} onClick={this.open.bind(this)} >
                        <AddIcon/>
                    </Button>
                </Zoom>

                <PromptDialog 
                    {...this.props}
                    open={this.state.open}
                    onClose={this.close.bind(this)} 
                    onSave={this.save.bind(this)}
                />
            </Fragment>
        );
    }
}

export default withStyles(styles)(PlusFab);