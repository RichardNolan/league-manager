const { division } = require('../models/')
const team = require('./team')
const table = require('./table')

const {createFixtureList, createSchedule} = require('../../methods/fixtures')

const aggregate = async data=>{
    data.teams = await team.getTeams({division:data._id})
    data.table = await table.findTable({division:data._id})
    
    return data
}

module.exports = {
    getDivisions: (criteria={})=>{
        let {limit,skip} = criteria
        limit && delete criteria.limit
        skip && delete criteria.skip
        return division.find(criteria)
            .populate({ path: 'league' })
            // .populate({ path: 'teams' })
            // .populate({ path: 'table' })
            .then(data=>data)
            .catch(err=>console.log({error:true, message:"Error getting divivions"}))
    },

    getDivision: (id)=>(
        division.findById(id)
            .populate({ path: 'league' , select:'title'})
            .populate({ path: 'table' })
            .then(aggregate)
            .catch(err=>console.log({error:true, message:err}))
    ),

    findDivision: (criteria={})=>(
        division.findOne(criteria)
        .populate({ path: 'league' , select:'title'})
        .populate({ path: 'table' })
        .then(aggregate)
        .catch(err=>console.log({error:true, message:err}))
    ),

    newDivision: ({title, rank, league})=>(
        new division({
                    title, 
                    rank,
                    league,
                })
                .save()
                .then(result=>result)
                .catch(err=>console.log({error:true, message:"Error creating division"}))
    ),

    createFixtureList: (division_id)=>{
        return new Promise(async (resolve, reject)=>{   
            let division  = await module.exports.getDivision(division_id)
            let fixtures = createFixtureList(division.teams)
            let {schedule} = createSchedule(fixtures)

            fixtures = fixtures.map(fixture=>{
                let date = schedule['round_'+fixture.round]
                fixture.date = date.year()+"-"+(date.month()+1)+"-"+date.date()
                fixture.division = division_id
                fixture.status =  'ON'  
                fixture.competition = division.competition
                return fixture
            })
            resolve(fixtures)
        })
    }
    
}