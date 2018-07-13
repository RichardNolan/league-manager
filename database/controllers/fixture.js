const { fixture } = require('../models/')
const table = require('./table')
const venue = require('./venue')
const team = require('./team')
const {createTable} = require('../../methods/table')
const utils = require('../../methods/fixtures')

const aggregate = async data=>{
    // data.home_team = await team.getTeam(data.home_team)
    // data.away_team = await team.getTeam(data.away_team)
    // data.venues = await venue.getVenues({fixture:data._id})
    return data
}

// TO-DO this is triggered when you update a fixture, it should trigger when you update a score
// const siblings = async data=>{
//     let fixtures = await module.exports.getFixtures({division:data.division})
//     let table = createTable(fixtures)
//     table
//         .updateTable(data.division, table)
//         .then(data=>data)
//         .catch(err=>console.log({error:true, message:"Error updating table"}))
// }


module.exports = {
    getFixtures: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        criteria.date
        return fixture
            .find(criteria)
            .where('date')
            .gt(Date.now())
            .populate({ path: 'score' })
            .populate({ path: 'home_team', populate:{path:'club', select:'title_short'} })
            .populate({ path: 'away_team', populate:{path:'club', select:'title_short'} })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting fixtures"}))
    },

    getFixture: (id)=>(
        fixture
            .findById(id)
            .populate({ path: 'score' })
            .populate({ path: 'home_team' })
            .populate({ path: 'away_team' })
            .populate({ path: 'referee' })
            .populate({ path: 'time_slot' })
            .populate({ path: 'division' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),
    
    findFixture: (criteria={})=>(
        fixture
            .findOne(criteria)
            .populate({ path: 'score' })
            .populate({ path: 'home_team' })
            .populate({ path: 'away_team' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    // updateFixture: async (id, data)=>{
    //     fixture
    //         .findByIdAndUpdate(id, { $set: data}, { new: false })
    //         .then(siblings)
    //         .catch(err=>console.log({error:true, message:err}))
    // },   
    updateFixture: (_id, data)=>(
        fixture
            .findByIdAndUpdate(_id, data, { new: true })
            // .then(siblings)
            .catch(err=>console.log({error:true, message:err}))
        ),

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
        fixtures.map(fixture=>{
            fixture.date = schedule['round_'+fixture.round].toDate()
            fixture.division = fixture.home_team.division
            fixture.status = 0
            fixture.referee = null
            fixture.home_team = fixture.home_team._id
            fixture.away_team = fixture.away_team._id
            return fixture
        })
        // fixture.collection.insert(fixtures, (err, data)=>{
        //     if(err) console.error(err)
        //     else console.log('It worked')
        // })
        // return {fixtures, schedule }
        return fixture.collection.insert(fixtures)
            .then(res=>{
                console.log(`${res.length} fixtures added`)
                return res.ops
            })
            .catch(err=>console.log(err))
    }
}