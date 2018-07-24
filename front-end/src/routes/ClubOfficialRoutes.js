import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import AwaitingScores from '../components/scores/AwaitingScores'
import Results from '../components/results/Results'
import Fixtures from '../components/fixtures/Fixtures'
import {injectUser} from '../utilities/utils'

const Teams = ()=>{return null}
const Tables = ()=>{return null}
const Players = ()=>{return null}
const Users = ()=>{return null}
const Secretary = ()=>{return null}


const Routes = [
    { 
        order:7,
        link: "Players",
        icon: DraftsIcon,
        pageTitle: "Players",
        path: "/clubofficial/players", 
        component: Players
    },
    { 
        order:6,
        link: "Teams",
        icon: DraftsIcon,
        pageTitle: "Teams",
        path: "/clubofficial/teams", 
        component: Teams
    },
    { 
        order:3,
        link: "Tables",
        icon: DraftsIcon,
        pageTitle: "Tables",
        path: "/clubofficial/tables", 
        component: Tables
    },
    { 
        order:4,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/clubofficial/results", 
        component:  injectUser(Results)       
    },
    { 
        order:5,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/clubofficial/fixtures", 
        component: Fixtures
    },
    { 
        order:3,
        link: "Users",
        icon: DraftsIcon,
        pageTitle: "Users",
        path: "/clubofficial/users", 
        component: Users    /// WRAP IN HOC???
    },
    { 
        order:3,
        link: "Awaiting Scores",
        icon: DraftsIcon,
        pageTitle: "Users",
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)       
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "Club Official",
        path: "", 
        component: injectUser(Secretary)   
    }
];

export default Routes;
