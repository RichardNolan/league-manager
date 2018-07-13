const moment = require('moment')
const {isValidDate, shuffle } = require('./common')

const createFixtureList = function(teams, {
    two_legs = true,                           // HOME AND AWAY TIES ? 
    random = true                              // Mix up teams before schedule. Needs to be false to test 1-leg fixtures
}={}){
    
    /*
    4 teams play 6 matches over 1 leg or 12 over 2 legs
    this is 3 rounds of matches or 6 rounds of matches
    */

    let fixtures = []; 
    let rounds = two_legs ? ((teams.length-1)*2) : teams.length-1;
    let groupA = random ? shuffle([...teams]) : [...teams]
    let groupB = groupA.splice(groupA.length/2, groupA.length);

    /*  The splice above rounds down, so an odd number of team will have the smaller number in A
        The loop below making fixtures works off the length of A so the last team in B will be ignored
        for that round, as they have no one to play
    */
    for (let i = 1; i <= rounds; i++) {
        for (let j = 0; j < groupA.length; j++) {
            let home = i%2 ? groupA[j] : groupB[j];
            let away = i%2 ? groupB[j] : groupA[j]; 
            fixtures.push({home_team: home, away_team:away, round:i});
        }
        groupB.push(groupA.pop()); 
        groupA.splice( (teams.length%2 ? 0 : 1) , 0, groupB.shift());
    }        
    return fixtures
}







const createSchedule = (
    fixtures,
    season_start = moment().add(1, 'months'), // DEFAULT: 1 month from today
    season_end = moment().add(10, 'months'),  // DEFAULT: 10 months from today
)=>{

    // Make both start and end dates MOMENT instances
    if( isValidDate(season_start, season_end) ){
        season_start = moment(season_start)
        season_end = moment(season_end)
    }else{
        return {error:true, message: `One of the supplied dates, ${season_start} or ${season_end}, is not valid.`}
    }

    const num_rounds = Math.max(...fixtures.map(f=>f.round));               // Max round number found in fixtures array
    const season_duration = season_end.diff(season_start, 'days');          // Number of days in a season
    const days_per_game = season_duration/(num_rounds-1);                   // Number of days per game
    const time_units = days_per_game>=7 ? 'weeks' : 'days';                 // If more than seven, games are played at weekly units, otherwise daily
    const time_units_per_game = time_units==='weeks' ? days_per_game/7 : days_per_game; // The increment for the scheduler
    // ALL THE ABOVE COULD BE TRANSLATED INO MOMENTS duration OBJECT
    // OR USE THE MOMENT-RANGE LIBRARY

    // set the first day as the default matchday
    const matchday = time_units==="weeks" ? season_start.day() : 0
    // create blank schedule
    // const schedule = []
    const schedule = {}
    // loop through the rounds
    for(let i=0; i<num_rounds; i++){
        // fixture date for each round is gotten by manipulating a copy of the date of the first day of the season
        let fixture_date = 
            season_start
            .clone()                                                // season_start is mutable - so clone it
            .add((time_units_per_game*i), time_units)               // add INCREMENT*(ROUND-1) UNITS on to this date (2*0)'days' or (2*6)'days'
            .startOf(time_units)                                    // then go to the start of that day/week
            .add(12,'hours')                                        // prevents daylight savings messing up the schedule. The time starts out at 12pm but finishes at 11am, but it doesn't matter.                
            .add(matchday, 'days')                                  // then forward to the matchday
            //COULD MAYBE CHECK THE DATE HERE AGAINST BLACKLISTED DATES, LIKE XMAS
        
        // schedule.push({round:(i+1), scheduled_date:fixture_date});  // push fixture date for this round on to schedule object. (i+1) because i has to be 0 for first day
        schedule['round_'+(i+1)] = fixture_date
    }   
    
    // This just gets all potential dates (including used) on that matchday
    // This could be used to move an entire round.
    // The change fixture date function should be just a calendar not restricting matchday
    // Can't see much use for this at the moment.
    let potential_date = season_start.clone()
    let all_dates = [potential_date.valueOf()]
    while(potential_date.isBefore(season_end)){
        potential_date
        .add(1, time_units)              
        .startOf(time_units)                                   
        .add(matchday, 'days') 
        all_dates.push(potential_date.valueOf())                
    }
    // return {schedule, all_dates} // THIS ALL_DATES OBJECT IS SIMPLY EVERY DAY THAT A MATCH COULD BE PLAYED IE EVERY SATURDAY IN THE TIMELINE
    return schedule
}

module.exports = {
    createFixtureList,
    createSchedule
}