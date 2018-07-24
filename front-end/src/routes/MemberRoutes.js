import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

import {injectUser} from '../utilities/utils'

import Team from '../components/teams/Team'

const Division = ()=>{return null}
const Club = ()=>{return null}


const Routes = [
    {  
        order:3,
        link: "My Division",
        icon: SendIcon,
        path: "/mydivision", 
        component: injectUser(Division)    
    },
    {  
        order:3,
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
        component: injectUser(Team)    
    },
];

export default Routes;
