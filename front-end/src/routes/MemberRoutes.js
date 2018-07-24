import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import {injectUser} from '../utilities/utils'

import Team from '../components/teams/Team'
import Club from '../components/clubs/Club'
import Organisation from '../components/organisation/Organisation'
import MemberHome from '../components/members/MemberHome'

const Routes = [
    {  
        order:4,
        link: "All Competitions",
        icon: DraftsIcon,
        path: "/myorganisation", 
        component: injectUser(Organisation)    
    },
    {  
        order:4,
        link: "My Club",
        icon: SendIcon,
        path: "/myclub", 
        component: injectUser(Club)    
    },
    {  
        order:2,
        link: "My Team",
        icon: SendIcon,
        path: "/myteam", 
        component: injectUser(Team)    
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "Member",
        path: "", 
        component: injectUser(MemberHome)    
    },
];

export default Routes;
