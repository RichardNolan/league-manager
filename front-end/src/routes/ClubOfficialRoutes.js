import { Dns, ViewAgenda, Group, Home} from '@material-ui/icons';
import AwaitingScores from '../components/scores/AwaitingScores'
import {injectUser} from '../utilities/utils'
import ClubOfficial from '../components/officials/ClubOfficial';

import Club from '../components/clubs/Club'
const Players = ()=>{return null}
const Users = ()=>{return null}


const Routes = [
    { 
        order:7,
        link: "Players",
        icon: Group,
        pageTitle: "Players",
        path: "/clubofficial/players", 
        component: Players
    },
    {  
        order:4,
        link: "My Club",
        icon: Home,
        path: "/myclub", 
        component: injectUser(Club)    
    },
    { 
        order:3,
        link: "Users",
        icon: Group,
        pageTitle: "Users",
        path: "/clubofficial/users", 
        component: Users   
    },
    { 
        order:3,
        link: "Awaiting Scores",
        icon: Dns,
        pageTitle: "Users",
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)       
    },
    {  
        order:1,
        link: "Dashboard",
        icon: ViewAgenda,
        pageTitle: "Club Official",
        path: "", 
        component: injectUser(ClubOfficial)   
    }
];

export default Routes;
