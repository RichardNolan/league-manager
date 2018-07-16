import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import AwaitingScores from '../components/scores/AwaitingScores';

import {injectUser} from '../utilities/utils'
const Fixtures = ()=>{return null}
const Results = ()=>{return null}


const Routes = [
    { 
        order:4,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/results/", 
        component: Results
    },
    { 
        order:3,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/fixtures/", 
        component: Fixtures
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
    }
];
export default Routes;
