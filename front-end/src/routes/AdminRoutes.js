
import Organisations from "../components/organisation/Organisations";
import Users from "../components/users/Users";
import {injectUser} from '../utilities/utils'
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import UserHome from "../components/users/UserHome";


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
        component: injectUser(Users), 
    },
    {  
        order:1,
        link: "Admin Dashboard",
        icon: SendIcon,
        pageTitle: "Administration Dashboard",
        path: "", 
        component: injectUser(UserHome), 
    }
];

export default Routes;
