const { fixture,time_slot } = require('../models/')
const table = require('./table')
const result = require('./result')
const team = require('./team')
const {createTable} = require('../../methods/table')
const utils = require('../../methods/fixtures')
const {aggregate_scores} = require('../../methods/score')

// const updateTable

const aggregate = async data=>{
    // data.home_team = await team.getTeam(data.home_team)
    // data.away_team = await team.getTeam(data.away_team)
    // data.venues = await venue.getVenues({fixture:data._id})
    return data
}

const updateTable = async division=>{
    let fixtures = await result.getResults({division, status:'result'}).catch(err=>console.log(err))
    let leagueTable = createTable(fixtures)
    table
        .updateTable(division, leagueTable)
        .then(data=>data)
        .catch(err=>console.log({error:true, message:"Error updating table"}))
}


module.exports = {
    getFixtures: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        // criteria.date
        return fixture
            .find(criteria)
            .where('date')
            .gt(Date.now())
            .sort({date:1})
            // .populate({ path: 'score' })
            .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting fixtures"}))
    },

    getFixturesByTeam: (id)=>{
        return fixture
            .find({ $or:[ {'home_team':id}, {'away_team':id} ]})
            .where('date')
            .gt(Date.now())
            .sort({date:1})
            .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting fixtures"}))
    },

    getFixture: (id)=>(
        fixture
            .findById(id)
            .populate({ path: 'score' })
            .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short primary_color'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
            .populate({ path: 'referee' })
            .populate({ path: 'division' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findFixture: (criteria={})=>(
        fixture
            .findOne(criteria)
            .populate({ path: 'score' })
            .populate({ path: 'home_team', populate:{path:'club', select:'venue title_short'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

 
    updateFixture: async (_id, data)=>{  
        return fixture
            .findByIdAndUpdate(_id, data, { new: true })
            .then(result=>{      
                return result
            })
            // TO-DO .then(EMAIL ALL USERS OF HOME OR AWAY TEAM)
            .catch(err=>console.log({error:true, message:err}))
    },

    replaceFixture: async (data)=>{        
        let Fixture = await fixture
            .findByIdAndUpdate(id, { $set: data}, { new: true })
        if(!Fixture) return {error:true, message:"Couldn't update fixture"}
        else return Fixture
    },


    newFixture: async ({ status, competition, venue, division, referee, home_team, away_team, other_leg_fixture, score, time_slot, time })=>(
        new fixture({
                    status, 
                    competition,
                    venue,
                    division,
                    referee,
                    home_team,
                    away_team,
                    other_leg_fixture,
                    score, 
                    time_slot, 
                    time,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating fixture"}))
    ),

    createFixtureList: async ({division,two_legs,random,season_start,season_end})=>{

        let teams = await team.getTeams({division})
                        .catch(err=>console.log({error:true, message:err}))
        
        let fixtures = utils.createFixtureList(teams, {two_legs,random})
        let schedule = (season_start && season_end) ? utils.createSchedule(fixtures, season_start, season_end) : null

        if(schedule.error) console.log(schedule.message)

        fixtures.map(fixture=>{
            fixture.date = schedule['round_'+fixture.round].toDate()
            fixture.division = fixture.home_team.division
            fixture.status = 0
            fixture.referee = null
            fixture.club = fixture.home_team.club
            fixture.home_team = fixture.home_team._id
            fixture.away_team = fixture.away_team._id
            return fixture
        })
        return fixture.collection.insert(fixtures)
            .then(res=>{
                return {success:true, fixturesAdded:res.ops.length}
            })
            .catch(err=>console.log(err))
    },





    getAwaitingScore: (criteria={}, user)=>{
        let {limit,skip} = criteria
        let filter = 'score'

        if(user.isReferee) {
            criteria.referee = user._id
            filter = 'referee'
        }else if(user.isClubOfficial){
            filter = 'club_official'
        }

        limit && delete criteria.limit
        skip && delete criteria.skip

        return fixture
            .find(criteria)
            .where('date')
            .lt(Date.now())
            .where(filter+'_home')
            .equals(null)
            .where(filter+'_away')
            .equals(null)
            // .populate({ path: 'score'})
            .populate({ path: 'division', select:'_id title', populate:{path:'league', select:'_id title'} })
            .populate({ path: 'home_team', populate:{path:'club', select:'_id title_short venue'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'_id title_short'} })
            .then(data=>{
                // CLUB DETAILS CAN'T BE FILTERED IN THE QUERY SO ARE FILTERED HERE PRIOR TO SENDING THE DATA
                if(user.isClubOfficial){
                    return data.filter(fixture=>{
                        let valid = (
                                (fixture.home_team.club._id.toString() === user.club.toString()) 
                            || (fixture.away_team.club._id.toString() === user.club.toString())
                        ) && (
                                isNaN(fixture.club_official_away) || isNaN(fixture.club_official_home)
                        )
                        return valid
                    })
                }
                return data
            })
            .catch(err=>console.log({error:true, message:"Error getting fixtures"}))
    },

    upsertScore: (body)=>{
        let id = body.fixture
        delete body.fixture
        return fixture
            .findOneAndUpdate({_id:id}, body, {upsert:true, new:true})
            .then(result=>{
                if(result.status==='result') updateTable(result.division)
                let final_result = aggregate_scores(result)
                if(final_result){
                    final_result.status = 'result'
                    return fixture.findOneAndUpdate({_id:result.id}, final_result, {new:true})
                        .then(result=>{
                            updateTable(result.division)
                            return result
                        })
                        .catch(err=>console.log(err))
                }else{
                    return result
                }
                
            })
            .catch(err=>console.log(err))
        },

        deleteMany: (criteria)=>(
            fixture.
                    deleteMany(criteria)
        ),
    
}