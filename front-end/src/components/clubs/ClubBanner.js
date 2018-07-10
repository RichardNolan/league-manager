import React from 'react';

const ClubBanner = ({club}) => {

    let clubName = club && (club.title || null)
    let clubCrest = club && club.crest && (<img src={club.crest} style={{width:'100px'}} /> || null)
    return (
        <div>            
            <h1>{club.title}</h1>
                {clubCrest}
        </div>
    );
};

export default ClubBanner;