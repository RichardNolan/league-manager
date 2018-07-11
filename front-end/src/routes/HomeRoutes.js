// import MyClubLayout from '../components/containers/MyClub'
import LoginLayout from "../components/login/LoginLayout";
import ForgotPassword from "../components/login/ForgotPassword";
import RegisterContainer from "../components/register/RegisterContainer";
import Organisations from '../components/organisation/Organisations';
import Club from '../components/clubs/Club';
import League from '../components/leagues/League';
import Team from '../components/teams/Team';
import Home from '../components/layout/Home'

const Routes = [
    { 
        order:0,
        link: "League",
        path: "competition/:competition/league/", 
        component: League 
    },
    { 
        order:0,
        link: "Team",
        path: "team/:team", 
        component: Team 
    },
    { 
        order:0,
        link: "Club",
        path: "club/:club", 
        component: Club 
    },
    { 
        order:1,
        link: "Orgs",
        path: "organisations/", 
        component: Organisations 
    },
    { 
        order:0,
        link: "Register",
        path: "register/", 
        component: RegisterContainer 
    },
    { 
        order:0,
        link: "Log In",
        path: "login/", 
        component: LoginLayout 
    },
    { 
        order:0,
        link: "Forgot",
        pageTitle: "Forgot",
        path: "forgot/", 
        component: ForgotPassword 
    },
    { 
        order:1,
        link: "Home",
        path: "", 
        component: Home 
    },
];

export default Routes;
