import React from 'react';

import LeagueTable from '../tables/LeagueTable';
import Confirmation from '../leagues/NewLeague/Confirmation'
import { Grid } from '@material-ui/core';
 
const Home = () => {
    return (
        <div>    
            <Grid container>
                <Grid item md={6}>        
                    <LeagueTable title='Premiership' size='small' teams={['ManUtd', 'Mancity', 'Liverpool', 'Arsenal', 'Chelsea']} />
                </Grid>
                <Grid item md={12}>        
                    
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;