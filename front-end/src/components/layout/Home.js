import React from 'react';

import LeagueTable from '../tables/LeagueTable';

import { Grid } from '@material-ui/core';

 
const Home = () => {
    return (
        <div>    
            <Grid container>
                <Grid item md={12}>        
                    {/* <ForgotPassword /> */}
                </Grid>
                <Grid item md={12}>        
                    <LeagueTable title='Premiership' size='tiny' division="5b463a2b26c3f902c81da980" />
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;