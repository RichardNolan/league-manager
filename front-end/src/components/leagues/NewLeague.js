import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Stepper,Step,StepLabel,Button,Typography,  LinearProgress, Hidden} from '@material-ui/core';
import Finished from './NewLeague/Finished'
import steps from './NewLeague/steps'
import { post } from '../../utilities/fetch';
import SNACK from '../../SNACK'


class NewLeague extends Component {

    state = {
        activeStep: 0,
        loader:false,
    };

    handleNext=()=>{
        if(this.state.activeStep === steps.length - 1){
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
                this.props.showSnack("League saved...")
                this.setState((prevState) => ({
                    activeStep: prevState.activeStep + 1,
                    loader:false
                }));
            })
            .catch(err=>{                
                this.props.showSnack(err)
                // set loader false
            })        
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
        console.log( finished, this.state.activeStep, steps.length)           
        console.log( this.state.divisionsObject )           
        let ActiveStepComponent = finished ? Finished : steps[activeStep].component
        return (
                <div className={classes.root}>
                    
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

                    <div>
                        <Typography className={classes.instructions}>
                            {finished ? "All steps completed - you're finished" : steps[activeStep].helperText }                                    
                        </Typography>
                        <div className={classes.keepRight}>
                            {finished 
                                ? <Button component={Link} to={`/organisations/${this.props.competition.organisation}/competitions/${this.props.competition._id}/league/`}>Proceed to new League</Button> 
                                : ( <Fragment>                        
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
                                    </Fragment>
                                ) 
                            }
                        </div>
                    </div>
                </div>
        )
    }
}

const styles = theme => ({
      root: {
        padding: theme.spacing.unit*2,
      },
      backButton: {
        marginRight: theme.spacing.unit,
      },
      instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
      },
      keepRight:{
          display:'flex',
          justifyContent:'flex-end'
      }
    });
    
// export default withStyles(styles)(NewLeague);

const withSnack = props=>(
    <SNACK.Consumer>
       {({showSnack}) => <NewLeague {...props} showSnack={showSnack} />}
    </SNACK.Consumer>
)
 export default withStyles(styles)(withSnack);