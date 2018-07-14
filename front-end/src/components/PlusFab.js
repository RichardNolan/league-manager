import React, { Component } from 'react';
import { Zoom, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import USER from '../USER'

const styles = (theme)=>( {
    root: {
        // flexGrow: 1,
        position:'relative',
    },

    FAB: {
        position: 'absolute',
        top: 0 ,
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
        // if(!this.props.user)return null;  
        let PromptDialog = this.props.dialog
        return (
               
        <USER.Consumer>
            { ( {user} )=>{
            return (user.success ? (
                    <div className={this.props.classes.root}>
                        <Zoom
                            in={true}
                            unmountOnExit
                        >
                            <Button variant="fab" color="secondary" className={this.props.classes.FAB} onClick={this.open.bind(this)} >
                                <AddIcon/>
                            </Button>
                        </Zoom>

                        <PromptDialog 
                            {...this.props}
                            user={user}
                            open={this.state.open}
                            onClose={this.close.bind(this)} 
                            onSave={this.save.bind(this)}
                        />
                    </div>
            ) : null )}  }
        </USER.Consumer>
        );
    }
}

export default withStyles(styles)(PlusFab);