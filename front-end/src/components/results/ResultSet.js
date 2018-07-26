import React from 'react';
import Result from './Result';
import { Typography, withStyles } from '@material-ui/core';

const ResultSet = (props) => {
    let results = props.results
            ? props.results.map((result, index)=>(
                    <Result 
                        result={result} 
                        key={index} 
                        {...props}
                    />
                ))
            : null
    
    if(props.results && props.results.length<=0) {
        return(
            <Typography variant='subheading' className={props.classes.heading} gutterBottom >
                There are no {props.title}
            </Typography>
        )
    }else if(props.results && props.results.length>0) {
        return (
            <div>
                {/* TO-DO NICER BANNER */}
                <Typography variant='headline' className={props.classes.heading} gutterBottom>
                    {props.title}
                </Typography>
                {results}
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

export default withStyles(styles)(ResultSet);