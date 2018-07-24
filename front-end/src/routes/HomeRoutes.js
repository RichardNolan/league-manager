// import MyClubLayout from '../components/containers/MyClub'
import LoginLayout from "../components/login/LoginLayout";
import ForgotPassword from "../components/login/ForgotPassword";
import ChangePassword from "../components/login/ChangePassword";
import RegisterContainer from "../components/register/RegisterContainer";
import Organisations from '../components/organisation/Organisations';
import Club from '../components/clubs/Club';
import League from '../components/leagues/League';
import Division from '../components/divisions/Division';
import Team from '../components/teams/Team';
import Home from '../components/layout/Home'

const Routes = [
    { 
        order:0,
        link: "League",
        path: "competitions/:competition/league/", 
        component: League 
    },
    { 
        order:0,
        link: "Division",
        path: "division/:division", 
        component: Division 
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
        order:6,
        link: "Organisations",
        path: "organisations/", 
        component: Organisations 
    },
    { 
        order:2,
        link: "Register",
        path: "register/", 
        component: RegisterContainer 
    },
    { 
        order:1,
        link: "Log In",
        path: "login/", 
        component: LoginLayout 
    },
    { 
        order:0,
        path: "changepassword/", 
        component: ChangePassword 
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
