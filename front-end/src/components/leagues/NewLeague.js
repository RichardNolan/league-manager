import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Stepper,Step,StepLabel,Button,Typography, Paper, LinearProgress, Hidden} from '@material-ui/core';
import Finished from './NewLeague/Finished'
import steps from './NewLeague/steps'
import { post } from '../../utilities/fetch';
import SNACK from '../../SNACK'

const styles = theme => ({
//   root: {
//     width: '100%',
//   },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  activeStepComponent:{
    padding: theme.spacing.unit*2,
  }
});


class NewLeague extends Component {

    state = {
        activeStep: 0,
        loader:false,
    };

    handleNext=()=>{
        if(this.state.activeStep === steps.length - 1){
            this.props.showSnack('post here')
            this.onSaveLeague()
        }else{
            this.setState((prevState) => ({
                activeStep: prevState.activeStep + 1
            }));
        }
    }

    handleBack=()=>{
        this.setState((prevState)=>({
            activeStep: prevState.activeStep - 1
        }));
    }

    handleReset=()=>{
        this.setState({activeStep: 0});
    }

    onChange=(name, value)=>{
        this.setState({[name]:value})
    }

    onSaveLeague=()=>{
        this.setState({loader:true})

        let league = {
            competition:this.props.competition._id,
            league: this.props.competition.league._id,
            divisions:this.state.divisionsObject
        }
        
        fetch('http://localhost:9000/api/league', post(league))
            .then(res=>res.json())
            .then(res=>{
                this.props.showSnack(res)
                this.setState((prevState) => ({
                    activeStep: prevState.activeStep + 1,
                    loader:false
                }));
            })
            .catch(err=>this.props.showSnack(err))

        
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        let stepIcons = steps.map((step, key) => (
            <Step key={key}>
                <StepLabel>{step.title}</StepLabel>
            </Step>
            )
        )

        let finished = this.state.activeStep === steps.length
        let ActiveStepComponent = finished ? Finished : steps[activeStep].component
        return (
            <div className={classes.root}>

                <Paper className={classes.activeStepComponent} >
                
                    <Hidden mdUp>
                        <Typography variant='subheading' color='secondary'>
                            This section of the website is not compatible with small screens, simply because there is a lot of elements to move around. It has been left enabled for you to try, but it really isn't advised.
                        </Typography>
                    </Hidden>
                                
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {stepIcons}
                    </Stepper>
                    {this.state.loader ? <LinearProgress /> : null }
                    <ActiveStepComponent 
                        onChange={this.onChange.bind(this)} 
                        divisions={this.state.divisions}
                        divisionsObject={this.state.divisionsObject}
                        competition={this.props.competition}
                    />
                </Paper>

                <div>
                    <Typography className={classes.instructions}>
                        {finished ? "All steps completed - you're finished" : steps[activeStep].helperText }                                    
                    </Typography>
                        {finished 
                            ? <Button onClick={this.handleReset}>Reset</Button> 
                            : (  <div>                        
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={this.handleNext}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            ) 
                        }
                </div>
            </div>
        )
    }
}

// export default withStyles(styles)(NewLeague);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <NewLeague {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);