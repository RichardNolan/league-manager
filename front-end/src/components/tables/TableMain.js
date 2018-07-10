import React, { Component, Fragment } from 'react';
import { LinearProgress, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
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
        return 0
    }

const TableMain = (props)=>{


    let tableRows = props.teams && props.teams
        .sort(sortTable)
        .map((t, index)=>{
        // FULL RETURNED OBJECT - {team:"", p:0, w:0, d:0, l:0, f:0, a:0, gd:0, pts:0, hp:0, ap:0, hw:0, aw:0, hd:0, ad:0, hl:0, al:0, hf:0, af:0, ha:0, aa:0, hgd:0, agd:0, hpts:0, apts:0, form:"", hform:"", aform:""};
        let {p,w,d,l,f,a,gd,hp,hw,hd,hl,hf,ha,hgd,hpts,ap,aw,ad,al,af,aa,agd,apts} = t
        let pts = t.pts || 0
        let team = t.team || t.title
        let tiny = {team,pts}
        let small = {team,p,w,d,l,pts}
        let medium = {team,p,w,d,l,gd,pts}
        let large = {team,p,w,d,l,f,a,gd,pts}
        let full = {team,hp,hw,hd,hl,hf,ha,hgd,hpts,ap,aw,ad,al,af,aa,agd,apts,p,w,d,l,f,a,gd,pts}
        let sizes = [tiny, small, medium, large, full]

        return <TableDataRow size={props.size} team={sizes[props.size]} key={index}/>
    })

    return (
        <Fragment>
            <Table>
                <TableHeadings size={props.size} />
                <TableBody>
                    {tableRows}
                </TableBody>
            </Table>
        </Fragment>
    );
    
}





export default withStyles(styles)(TableMain);