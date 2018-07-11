import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';

const Fixtures = ()=>{return null}
const Results = ()=>{return null}


const Routes = [
    { 
        order:4,
        link: "Results",
        icon: DraftsIcon,
        pageTitle: "Results",
        path: "/referee/results", 
        component: Results
    },
    { 
        order:5,
        link: "Fixtures",
        icon: DraftsIcon,
        pageTitle: "Fixtures",
        path: "/referee/fixtures", 
        component: Fixtures
    },
    {  
        order:1,
        link: "Dashboard",
        icon: SendIcon,
        pageTitle: "Referee",
        path: "/referee", 
    }
];
export default Routes;
