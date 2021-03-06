import {Alarm,LocalConvenienceStore, Dns, ViewAgenda} from '@material-ui/icons';
import AwaitingScores from '../components/scores/AwaitingScores';
import RefereeFixtures from '../components/referees/RefereeFixtures'
import RefereeResults from '../components/referees/RefereeResults'
import Referee from '../components/referees/Referee'
import {injectUser} from '../utilities/utils'

// const RefereeResults = ()=>{return null}


const Routes = [
    { 
        order:4,
        link: "Past Results",
        icon: LocalConvenienceStore,
        pageTitle: "Past Results",
        path: "/results/", 
        component: injectUser(RefereeResults)
    },
    { 
        order:3,
        link: "Upcoming Fixtures",
        icon: Alarm,
        pageTitle: "Upcoming Fixtures",
        path: "/fixtures/", 
        component: injectUser(RefereeFixtures)
    },
    { 
        order:2,
        link: "Awaiting Scores",
        icon: Dns,
        pageTitle: "Awaiting Scores",
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)   
    },
    {  
        order:1,
        link: "Dashboard",
        icon: ViewAgenda,
        pageTitle: "Referee",
        path: "", 
        component: injectUser(Referee), 
    }
];
export default Routes;
