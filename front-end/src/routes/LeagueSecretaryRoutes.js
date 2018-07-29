import Competitions from '../components/competitions/Competitions'
import Clubs from '../components/clubs/Clubs'
import Club from '../components/clubs/Club'
import Users from '../components/users/Users'
import Teams from '../components/teams/Teams'
import TeamContainer from '../components/teams/TeamContainer'
import AwaitingScores from '../components/scores/AwaitingScores'
import Results from '../components/results/Results'

import {injectUser} from '../utilities/utils'

import {Dns, Assessment, ViewAgenda, DirectionsRun,LocalConvenienceStore, Alarm, Person, Group, Home } from '@material-ui/icons';
import UserHome from '../components/users/UserHome';


const Fixtures = ()=>{return null}

const Tables = ()=>{return null}
const Players = ()=>{return null}
const Referees = ()=>{return null}


const Routes = [
    { 
        order:11,
        link: "Awaiting Scores",
        icon: Dns,
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)       
    },
    { 
        order:10,
        link: "Referees",
        icon: Person,
        pageTitle: "Referees",
        path: "/referees/", 
        component: Referees
    },
    { 
        order:9,
        link: "Competitions",
        icon: Assessment,
        pageTitle: "Competitions",
        path: "/competitions/", 
        component: injectUser(Competitions)
    },
    { 
        order:0,
        link: "Tables",
        icon: ViewAgenda,
        pageTitle: "Tables",
        path: "/tables/", 
        component: Tables
    },
    { 
        order:0,
        link: "Results",
        icon: LocalConvenienceStore,
        pageTitle: "Results",
        path: "/results/", 
        component: injectUser(Results)
    },
    { 
        order:0,
        link: "Fixtures",
        icon: Alarm,
        pageTitle: "Fixtures",
        path: "/fixtures/", 
        component: Fixtures
    },
    { 
        order:0,
        link: "Players",
        icon: DirectionsRun,
        pageTitle: "Players",
        path: "/players/", 
        component: Players
    },
    { 
        order:2,
        link: "Users",
        icon: Person,
        pageTitle: "Users",
        path: "/users/", 
        component: injectUser(Users), 
    },
    { 
        order:0,
        link: "Teams",
        icon: Group,
        pageTitle: "Teams",
        path: "/teams/:id", 
        component: TeamContainer    
    },
    { 
        order:0,
        link: "Teams",
        pageTitle: "Teams",
        path: "/teams/", 
        component: Teams
    },
    { 
        order:0,
        link: "Clubs",
        pageTitle: "Clubs",
        path: "/clubs/:id", 
        component: Club
    },
    { 
        order:2,
        link: "Clubs",
        icon: Home,
        pageTitle: "Clubs",
        path: "/clubs/", 
        component: injectUser(Clubs)   
    },
    {  
        order:1,
        link: "Dashboard",
        icon: ViewAgenda,
        pageTitle: "League Secretary",
        path: "", 
        component: injectUser(UserHome)
    }
];

export default Routes;
