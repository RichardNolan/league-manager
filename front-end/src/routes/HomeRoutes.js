import MyClubLayout from '../components/containers/MyClub'
import LoginLayout from "../components/login/LoginLayout";
import ForgotPassword from "../components/login/ForgotPassword";
import RegisterContainer from "../components/register/RegisterContainer";

import Organisations from '../components/organisation/Organisations';
import Organisation from '../components/organisation/Organisation';
import Clubs from '../components/clubs/Clubs';
import Club from '../components/clubs/Club';
import Teams from '../components/teams/Teams';
import Team from '../components/teams/Team';
import LeagueTable from '../components/tables/LeagueTable';

import Home from '../components/layout/Home'
// const Home = ()=>null
const Routes = [
    
    // { 
    //     order:0,
    //     path: "/organisations/:org/clubs/:club/teams/:team/table", 
    //     component: LeagueTable, 
    // },
    // { 
    //     order:0,
    //     path: "/organisations/:org/clubs/:club/teams/:team/", 
    //     component: Team, 
    // },
    // { 
    //     order:0,
    //     path: "/organisations/:org/clubs/:club/teams/", 
    //     component: Teams, 
    // },
    // { 
    //     order:0,
    //     path: "/organisations/:org/clubs/:club/", 
    //     component: Club,
    // },
    // { 
    //     order:0,
    //     path: "/organisations/:org/clubs/", 
    //     component: Clubs,
    // },
    // { 
    //     order:0,
    //     path: "/organisations/:org/", 
    //     component: Organisation ,
    // },
    // { 
    //     order:0,
    //     path: "/organisations/", 
    //     component: Organisations ,
    // },
    // { 
    //     order:0,
    //     path: "/organisation/:org/club/:club/team/:team/results", 
    //     component: Result, 
    // },
    // { 
    //     order:0,
    //     path: "/organisation/:org/club/:club/team/:team/fixtures", 
    //     component: Fixtures, 
    // },


    // '5b2acd2aa67acb2b1894e3b2'



    // { 
    //     order:5,
    //     link: "Teams",
    //     pageTitle: "Teams",
    //     path: "/teams", 
    //     component: Teams 
    // },
    
    { 
        order:0,
        link: "Club",
        pageTitle: "Organisations",
        path: "team/:team", 
        component: Team 
    },
    { 
        order:0,
        link: "Club",
        pageTitle: "Organisations",
        path: "club/:club", 
        component: Club 
    },
    { 
        order:5,
        link: "Orgs",
        pageTitle: "Organisations",
        path: "organisations/", 
        component: Organisations 
    },
    { 
        order:4,
        link: "Register",
        pageTitle: "Register/",
        path: "register", 
        component: RegisterContainer 
    },
    { 
        order:5,
        link: "Log In",
        pageTitle: "Log In",
        path: "login/", 
        component: LoginLayout 
    },
    // { 
    //     order:0,
    //     link: "Forgot",
    //     pageTitle: "Forgot",
    //     path: "/forgot", 
    //     component: ForgotPassword 
    // },
    // { 
    //     order:0,
    //     link: "My Club",
    //     pageTitle: "My Club",
    //     path: "/myclub", 
    //     component: MyClubLayout
     
    // },
    { 
        order:1,
        link: "Home",
        pageTitle: "League Manager",
        path: "", 
        component: Home 
    },
];

export default Routes;
