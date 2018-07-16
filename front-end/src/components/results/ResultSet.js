import React from 'react';
import Result from './Result';
import { Typography, withStyles } from '@material-ui/core';

const ResultSet = (props) => {
    let results = props.results.map((result, index)=>(
        <Result 
            result={result} 
            key={index} 
            {...props}
        />
    ))
    return (
        <div>
            <Typography variant='headline' className={props.classes.heading} >
                {props.title}
            </Typography>
            {results}
        </div>
    );
};

const styles=theme=>({
    heading:{
        textAlign:'center', 
    }
})

export default withStyles(styles)(ResultSet);