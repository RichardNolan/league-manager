import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import AwaitingScores from '../components/scores/AwaitingScores';
import RefereeFixtures from '../components/referees/RefereeFixtures'
import Referee from '../components/referees/Referee'
import {injectUser} from '../utilities/utils'

const RefereeResults = ()=>{return null}


const Routes = [
    { 
        order:4,
        link: "Past Results",
        icon: DraftsIcon,
        pageTitle: "Past Results",
        path: "/results/", 
        component: injectUser(RefereeResults)
    },
    { 
        order:3,
        link: "Upcoming Fixtures",
        icon: DraftsIcon,
        pageTitle: "Upcoming Fixtures",
        path: "/fixtures/", 
        component: injectUser(RefereeFixtures)
    },
    { 
        order:2,
        link: "Awaiting Scores",
        icon: DraftsIcon,
        pageTitle: "Awaiting Scores",
        path: "/awaitingscores/", 
        component: injectUser(AwaitingScores)   
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "Referee",
        path: "", 
        component: injectUser(Referee), 
    }
];
export default Routes;
