import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import Competitions from '../components/competitions/CompetitionsPanel'

const Fixtures = ()=>{return null}
const Results = ()=>{return null}
const Teams = ()=>{return null}
const Tables = ()=>{return null}
const Players = ()=>{return null}
const Users = ()=>{return null}
const Referees = ()=>{return null}
const Venues = ()=>{return null}
// const Competitions = ()=>{return null}
const Clubs = ()=>{return null}


const Routes = [
    { 
        order:11,
        link: "Venues",
        icon: DraftsIcon,
        pageTitle: "Venues",
        path: "/leaguesecretary/venues", 
        component: Venues
    },
    { 
        order:10,
        link: "Referees",
        icon: DraftsIcon,
        pageTitle: "Referees",
        path: "/leaguesecretary/referees", 
        component: Referees
    },
    { 
        order:9,
        link: "Competitions",
        icon: DraftsIcon,
        pageTitle: "Competitions",
        path: "/leaguesecretary/competitions", 
        component: Competitions
    },
    { 
        order:8,
        link: "Tables",
        icon: DraftsIcon,
        pageTitle: "Tables",
        path: "/leaguesecretary/tables", 
        component: Tables
    },
    { 
        order:7,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/leaguesecretary/results", 
        component: Results
    },
    { 
        order:6,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/leaguesecretary/fixtures", 
        component: Fixtures
    },
    { 
        order:5,
        link: "Players",
        icon: DraftsIcon,
        pageTitle: "Players",
        path: "/leaguesecretary/players", 
        component: Players
    },
    { 
        order:4,
        link: "Users",
        icon: DraftsIcon,
        pageTitle: "Users",
        path: "/leaguesecretary/users", 
        component: Users    /// WRAP IN HOC???
    },
    { 
        order:3,
        link: "Teams",
        icon: DraftsIcon,
        pageTitle: "Teams",
        path: "/leaguesecretary/teams", 
        component: Teams
    },
    { 
        order:2,
        link: "Clubs",
        icon: DraftsIcon,
        pageTitle: "Clubs",
        path: "/leaguesecretary/clubs", 
        component: Clubs    /// WRAP IN HOC???
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "League Secretary",
        path: "/leaguesecretary", 
    },
    {  
        order:0,
        link: "Home",
        icon: SendIcon,
        pageTitle: "Homepage",
        path: "/", 
    },
];

export default Routes;
