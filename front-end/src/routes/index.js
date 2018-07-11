import React from 'react'
import MainLayout from "../components/layout/MainLayout";
import {Redirect} from 'react-router-dom'
import MemberRoutes from './MemberRoutes'
import AdminRoutes from './AdminRoutes'
import ClubOfficialRoutes from './ClubOfficialRoutes'
import LeagueSecretaryRoutes from './LeagueSecretaryRoutes'
import RefereeRoutes from './RefereeRoutes'
import TeamManagerRoutes from './TeamManagerRoutes'
import USER from '../USER'


// This wrapper wraps every route in the USER context before proceeding - except the Home route
// This wrapper passes the relevant routes through to the MainLayout for display and menus
// This wrapper also will only render the route if the relevant boolean value is saved with the user (isAdmin, isReferee, etc)
const Wrapper = (props)=>{
    return (
        <USER.Consumer>
            { ({user})=> {
                return (
                    (user.success && user.user && user.user[props.check]) 
                    ? <MainLayout routes={props.routes} user={user} {...props} /> 
                    : <Redirect to='/login'/>
                )
            } }
        </USER.Consumer>
    )
}



const Routes = [
    { 
        path: "/member", 
        component: (props)=><Wrapper routes={MemberRoutes} {...props} check='isMember' />
    },
    { 
        path: "/clubofficial", 
        component: (props)=><Wrapper routes={ClubOfficialRoutes} {...props} check='isClubOfficial' /> 
    },
    { 
        path: "/teammanager", 
        component: (props)=><Wrapper routes={TeamManagerRoutes} {...props} check='isTeamManager' /> 
    },
    { 
        path: "/referee", 
        component: (props)=><Wrapper routes={RefereeRoutes} {...props} check='isReferee' /> 
    },
    { 
        path: "/leaguesecretary", 
        component: (props)=><Wrapper routes={LeagueSecretaryRoutes} {...props} check='isLeagueSecretary' /> 
    },
    { 
        path: "/admin", 
        component: (props)=> <Wrapper routes={AdminRoutes} {...props} check='isAdmin' /> 
    },
    { 
        path: "/", 
        component: MainLayout 
    },
];

export default Routes;
