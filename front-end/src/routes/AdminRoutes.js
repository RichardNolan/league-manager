import LoadList from '../components/HOC/LoadList'

import Organisations from "../components/organisation/Organisations";
import Users from "../components/users/Users";

import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import React from 'react'

const Home = ()=><div>Admin</div>
const Routes = [
    { 
        order:3,
        link: "Organisations",
        icon: DraftsIcon,
        pageTitle: "Organisations",
        path: "/organisations/", 
        // route: "/admin/organisations/", 
        component:Organisations, 
    },
    { 
        order:2,
        link: "Users",
        icon: DraftsIcon,
        pageTitle: "Users",
        path: "/users/", 
        component: LoadList('user')(Users), 
    },
    {  
        order:1,
        link: "Admin Dashboard",
        icon: SendIcon,
        pageTitle: "Administration Dashboard",
        path: "", 
        component: Home  
    },
    // {  
    //     order:0,
    //     link: "Home",
    //     icon: SendIcon,
    //     pageTitle: "Homepage",
    //     path: "/", 
    //     component: MainLayout 
    // },
];

export default Routes;
