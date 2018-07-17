import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import React from 'react'
import {injectUser} from '../utilities/utils'

import Team from '../components/teams/Team'

const Fixtures = ()=>{return null}
const Results = ()=>{return null}
const Teams = ()=>{return null}
const Tables = ()=>{return null}
const Players = ()=>{return null}
const MemberHome = ()=>{return <h1>Members Dashboard</h1>}


const Routes = [
    { 
        order:8,
        link: "Tables",
        icon: DraftsIcon,
        pageTitle: "Tables",
        path: "/tables", 
        component: Tables
    },
    { 
        order:7,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/results", 
        component: Results
    },
    { 
        order:6,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/fixtures", 
        component: Fixtures
    },
    { 
        order:5,
        link: "Players",
        icon: DraftsIcon,
        pageTitle: "Players",
        path: "/players", 
        component: Players
    },
    { 
        order:3,
        link: "Teams",
        icon: DraftsIcon,
        pageTitle: "Teams",
        path: "/teams", 
        component: Teams
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "Member",
        path: "/", 
        component: injectUser(Team)    
    },
];

export default Routes;
