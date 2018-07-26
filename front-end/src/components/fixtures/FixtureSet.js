import React from 'react';
import Fixture from './Fixture';
import { Typography, withStyles } from '@material-ui/core';

const FixtureSet = (props) => {
    let fixtures = props.fixtures
            ? props.fixtures.map((fixture, index)=>(
                    <Fixture 
                        fixture={fixture} 
                        key={index} 
                        {...props}
                    />
                ))
            : null

    if(props.fixtures && props.fixtures.length<=0){ 
        return(
            <Typography variant='subheading' className={props.classes.heading} gutterBottom >
                There are no {props.title}
            </Typography>
        )
    }else if(props.fixtures && props.fixtures.length>0) {
        return (
            <div>
                {/* TO-DO NICER BANNER */}
                <Typography variant='headline' className={props.classes.heading} gutterBottom >
                    {props.title}
                </Typography>
                {fixtures}
            </div>
        )
    }else{
        return null
    }
};

const styles=theme=>({
    heading:{
        textAlign:'center', 
        padding:16,
    }
})

export default withStyles(styles)(FixtureSet);