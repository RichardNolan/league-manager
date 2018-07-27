import React from 'react';
import { Table,TableBody } from '@material-ui/core';
import TableHeadings from './TableHeadings';
import TableDataRow from './TableDataRow'
import {withStyles} from '@material-ui/core/styles'


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',
    }
  });

  const sortTable = (a,b)=>{
        if(a.pts>b.pts) return -1
        if(a.pts<b.pts) return 1
        if(a.pts===b.pts) {
            if(a.gd>b.gd) return -1
            if(a.gd<b.gd) return 1
            if(a.gd===b.gd) {
                if(a.f>b.f) return -1
                if(a.f<b.f) return 1
            }
        }
        if(a.team>b.team) return 1
        if(a.team<b.team) return -1
        if(a.title>b.title) return 1
        if(a.title<b.title) return -1


        if(a.title>b.title) return 1
        if(a.title<b.title) return -1
        if(a.team.club && a.team.club.title_short){
            if(a.team.club.title_short>b.team.club.title_short) return 1
            if(a.team.club.title_short<b.team.club.title_short) return -1
        }
        return 0
    }

const TableMain = (props)=>{
    let {size} = props || 0
    let {teams} = props || []
    let position = null
    let tableRows = teams && teams
        .sort(sortTable)
        .filter((t, index)=>{
            if(props.single && t.team!==props.single) return false
            if(props.single && t.team===props.single) position=index
            return true 
        })
        .map((t, index)=>{
            // FULL RETURNED OBJECT - {team:"", p:0, w:0, d:0, l:0, f:0, a:0, gd:0, pts:0, hp:0, ap:0, hw:0, aw:0, hd:0, ad:0, hl:0, al:0, hf:0, af:0, ha:0, aa:0, hgd:0, agd:0, hpts:0, apts:0, form:"", hform:"", aform:""};
            let {p,w,d,l,f,a,gd,hp,hw,hd,hl,hf,ha,hgd,hpts,ap,aw,ad,al,af,aa,agd,apts,form,hform,aform} = t
            let pts = t.pts || 0
            let title = t.title //typeof t.team==="object" ? (t.team.club && t.team.club.title_short) || t.title : t.team || t.title
            title = props.single ? 'Position '+(position+1) : title
            let tiny = {title,pts}
            let small = {title,p,w,d,l,pts}
            let medium = {title,p,w,d,l,gd,pts}
            let large = {title,p,w,d,l,f,a,gd,pts}
            let full = {title,hp,hw,hd,hl,hf,ha,hgd,hpts,hform,ap,aw,ad,al,af,aa,agd,apts,aform,p,w,d,l,f,a,gd,pts,form}
            let sizes = [tiny, small, medium, large, full]
            return <TableDataRow size={size} team={sizes[size]} key={index}/>
        })

    return (
            <Table>
                <TableHeadings size={size} />
                {tableRows && (
                    <TableBody>
                        {tableRows}
                    </TableBody>
                )}
            </Table>
    );
    
}





// export default TableMain
export default withStyles(styles)(TableMain);