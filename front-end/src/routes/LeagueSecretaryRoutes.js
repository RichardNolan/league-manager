// import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import Competitions from '../components/competitions/Competitions'
import Clubs from '../components/clubs/Clubs'
import Club from '../components/clubs/Club'
import Users from '../components/users/Users'
import Teams from '../components/teams/Teams'
import TeamContainer from '../components/teams/TeamContainer'
import AwaitingScores from '../components/scores/AwaitingScores'
import Results from '../components/results/Results'

import {injectUser} from '../utilities/utils'



const Fixtures = ()=>{return null}
// const Results = ()=>{return null}

const Tables = ()=>{return null}
const Players = ()=>{return null}
const Referees = ()=>{return null}


const Routes = [
    { 
        order:11,
        link: "Awaiting Scores",
        icon: DraftsIcon,
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)       
    },
    { 
        order:10,
        link: "Referees",
        icon: DraftsIcon,
        pageTitle: "Referees",
        path: "/referees/", 
        component: Referees
    },
    { 
        order:9,
        link: "Competitions",
        icon: DraftsIcon,
        pageTitle: "Competitions",
        path: "/competitions/", 
        component: injectUser(Competitions)
    },
    { 
        order:8,
        link: "Tables",
        icon: DraftsIcon,
        pageTitle: "Tables",
        path: "/tables/", 
        component: Tables
    },
    { 
        order:7,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/results/", 
        component: injectUser(Results)
    },
    { 
        order:6,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/fixtures/", 
        component: Fixtures
    },
    { 
        order:5,
        link: "Players",
        icon: DraftsIcon,
        pageTitle: "Players",
        path: "/players/", 
        component: Players
    },
    { 
        order:2,
        link: "Users",
        icon: DraftsIcon,
        pageTitle: "Users",
        path: "/users/", 
        component: injectUser(Users), 
    },
    { 
        order:0,
        link: "Teams",
        icon: DraftsIcon,
        pageTitle: "Teams",
        path: "/teams/:id", 
        component: TeamContainer    
    },
    { 
        order:3,
        link: "Teams",
        icon: DraftsIcon,
        pageTitle: "Teams",
        path: "/teams/", 
        component: Teams
    },
    { 
        order:0,
        link: "Clubs",
        icon: DraftsIcon,
        pageTitle: "Clubs",
        path: "/clubs/:id", 
        component: Club
    },
    { 
        order:2,
        link: "Clubs",
        icon: DraftsIcon,
        pageTitle: "Clubs",
        path: "/clubs/", 
        component: injectUser(Clubs)   
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "League Secretary",
        path: "", 
    }
];

export default Routes;
