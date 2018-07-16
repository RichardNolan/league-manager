const methods = {

    // Accepts a fixture object with its score populated 
    // The AET & Penalty scores are irrelevant for a league
    aggregate_scores: (fixture={})=>{
        let { 
            referee_home,
            referee_away,
            club_official_home,
            club_official_away,
            score_home,
            score_away
         } = fixture

        // IF THE SCORE IS ALREADY SET - RETURN IT
        if( typeof score_home === 'number' 
            && typeof score_away === 'number'
        ) return null

        // OTHERWISE - CHECK IF THEY'RE THE SAME, IN WHICH CASE RETURN THAT
        if( referee_home === club_official_home
            && referee_away === club_official_away
        ) return {score_home:referee_home, score_away:referee_away}

        // OTHERWISE - RETURN A PAIR OF NULLS
        return null
    }
}

module.exports = methods