import React from 'react'
import { withStyles } from '@material-ui/core/styles';

// import MemberRoutes from './MemberRoutes'
// import AdminRoutes from './AdminRoutes'
// import ClubOfficialRoutes from './ClubOfficialRoutes'
// import LeagueSecretaryRoutes from './LeagueSecretaryRoutes'
// import RefereeRoutes from './RefereeRoutes'
// import TeamManagerRoutes from './TeamManagerRoutes'

import {Drawer,List,MenuList,MenuItem,ListItemIcon,ListItemText} from '@material-ui/core'
import { ViewAgenda} from '@material-ui/icons';

import {injectUser} from '../../utilities/utils'

import {Done} from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'
import MemberHome from '../members/MemberHome'

const Sidebar = (props)=>{
    let {classes, routes} = props
    let sidebarRoutes = [...routes]

    // TO-DO ADD DASHBOARD LINK FOR EACH USER 
    if(props.match.path!=='/member' && props.user.user && props.user.user.isMember) sidebarRoutes.push(
        {  
            order:1,
            link: "My Dashboard",
            icon: ViewAgenda,
            pageTitle: "Member",
            path: "member/", 
            component: injectUser(MemberHome)    
        }
    )

    const menuItems = sidebarRoutes
        .filter(link=>link.order!==0)
        .sort((a,b)=>{
            if(a.order<b.order) return -1
            else return 1
        })
        .map((route, key)=>{
            let Icon = route.icon || Done 
            return(
                <MenuItem 
                    key={key} 
                    component={Link} 
                    onClick={props.closeDrawer}
                    to={`${props.match.url}${route.path}`}
                    from={window.location.pathname}
                >
                    <ListItemIcon className={classes.icon}>
                        <Icon/>
                        {/* <img src={'/images/icons/'+route.icon+'.svg'} /> */}
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary={route.link} />
                </MenuItem>
            )
        })
    return(
        <Drawer 
            variant="persistent"
            anchor="left"
            open={props.open}
        >
            <div className={classes.toolbar} />
            <List className={classes.drawer}>
                <MenuList>
                    {menuItems}
                </MenuList>
            </List>
            <Divider />
        </Drawer>
    )
};
    

const styles=theme=>({
    drawer: {
        position: 'relative',
        width: 240,
      },
      wrapper:{},
      content:{},
      toolbar:{},
  })

export default withStyles(styles)(Sidebar);