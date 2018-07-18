import React from 'react';

// import LeagueTable from '../tables/LeagueTable';
import NewLeague from '../leagues/NewLeague'
// import { Grid } from '@material-ui/core';

 
const Home = () => {
    let test = {
        organisation: "5b2acd2aa67acb2b1894e3b2",
        league:{
            category:"Mens Senior"
        }
    }
    return (
        <div>    
     
                    {/* <LeagueTable title='Premiership' size='full' division="5b463a2b26c3f902c81da980" /> */}
                    <NewLeague competition={test}/>
              
        </div>
    );
};

export default Home;