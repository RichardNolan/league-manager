import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import {Drawer,List,MenuList,MenuItem,ListItemIcon,ListItemText} from '@material-ui/core'

import {Done} from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom'

const Sidebar = (props)=>{
    let {classes, routes} = props
    const menuItems = routes
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