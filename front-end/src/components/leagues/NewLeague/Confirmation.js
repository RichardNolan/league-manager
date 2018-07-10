import React from 'react';
import LeagueTable from '../../tables/LeagueTable'
import { Grid } from '@material-ui/core';



const Confirmation = (props) => {
    console.log(props.divisionsObject)
    let divisions = Object.keys(props.divisionsObject).map((d, index)=>(
        <Grid item md={6} key={index}>
            <LeagueTable size='tiny' teams={props.divisionsObject[d]} title={d} />
        </Grid>
    ))
    return (
        <Grid container >
            {divisions}
        </Grid>
    );
};

export default Confirmation;
