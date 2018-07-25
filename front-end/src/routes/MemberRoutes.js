import {Group, Assessment, Home, ViewAgenda} from '@material-ui/icons';

import {injectUser} from '../utilities/utils'

import Team from '../components/teams/Team'
import Club from '../components/clubs/Club'
import Organisation from '../components/organisation/Organisation'
import MemberHome from '../components/members/MemberHome'

const Routes = [
    {  
        order:4,
        link: "All Competitions",
        icon: Assessment,
        path: "/myorganisation", 
        component: injectUser(Organisation)    
    },
    {  
        order:4,
        link: "My Club",
        icon: Home,
        path: "/myclub", 
        component: injectUser(Club)    
    },
    {  
        order:2,
        link: "My Team",
        icon: Group,
        path: "/myteam", 
        component: injectUser(Team)    
    },
    {  
        order:1,
        link: "Dashboard",
        icon: ViewAgenda,
        pageTitle: "Member",
        path: "", 
        component: injectUser(MemberHome)    
    },
];

export default Routes;
