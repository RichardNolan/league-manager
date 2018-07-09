import React from 'react';

import ClubButton from '../clubs/ClubButton';
 
const Home = () => {
    return (
        <div>            
            <ClubButton color='#e52b16' stripe='white' text="Manchester United"/>
            <ClubButton color='#4281e5' stripe='#b5c7e5' text="Manchester City"/>
            <ClubButton color='#b71d0c' stripe='white' text="Arsenal"/>
            <ClubButton color='#3142af' stripe='white' text="Chelsea"/>
        </div>
    );
};

export default Home;