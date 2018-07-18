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
    return (
        <div>
            <Typography variant='headline' className={props.classes.heading} gutterBottom >
                {props.title}
            </Typography>
            {fixtures}
        </div>
    );
};

const styles=theme=>({
    heading:{
        textAlign:'center', 
    }
})

export default withStyles(styles)(FixtureSet);