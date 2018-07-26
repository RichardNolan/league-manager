import React, { Fragment } from 'react';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const TableDataRow = (props) => {
    
    let {size, team, classes} = props

    const displayForm = fStr =>{
        if(!fStr || fStr=='') return null
        return fStr.split('').slice(-5).map((f, key)=>{
            if(f==="0")return <Avatar className={classes.lost} key={key}></Avatar>
            if(f==="1")return <Avatar className={classes.drew} key={key}></Avatar>
            if(f==="3")return <Avatar className={classes.won} key={key}></Avatar>
            return null
        })

    }

    if(size>=0 && size<4){
        return(
                <TableRow className={props.classes.row}>
                    <TableCell className={classes.dense} component="th" scope="row">{team.title || team.team}</TableCell>
                    {size>0 && (
                        <Fragment>
                            <TableCell numeric className={classes.dense}>{team.p}</TableCell>
                            <TableCell numeric className={classes.dense}>{team.w}</TableCell>
                            <TableCell numeric className={classes.dense}>{team.d}</TableCell>
                            <TableCell numeric className={classes.dense}>{team.l}</TableCell>
                        </Fragment>
                    )}
                    {size===2 && <TableCell numeric className={classes.dense}>{team.gd}</TableCell>}
                    {size>2 && (
                        <Fragment>
                            <TableCell numeric className={classes.dense}>{team.f}</TableCell>
                            <TableCell numeric className={classes.dense}>{team.a}</TableCell>
                            <TableCell numeric className={classes.dense}>{team.gd}</TableCell>
                        </Fragment>
                    )}
                    <TableCell numeric className={classes.dense}>{team.pts}</TableCell>
                </TableRow>
        )
    }else{

        return(
        
                <TableRow className={props.classes.row}>
                    <TableCell className={classes.dense} component="th" scope="row">{team.team || team.title}</TableCell>
                    <TableCell numeric className={classes.divide}>{team.hp}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hw}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hd}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hl}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hf}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.ha}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hgd}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.hpts}</TableCell>
                    <TableCell numeric className={classes.dense}>{displayForm(team.hform)}</TableCell>
                    <TableCell numeric className={classes.divide}>{team.ap}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.aw}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.ad}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.al}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.af}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.aa}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.agd}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.apts}</TableCell>
                    <TableCell numeric className={classes.dense}>{displayForm(team.aform)}</TableCell>
                    <TableCell numeric className={classes.divide}>{team.p}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.w}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.d}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.l}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.f}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.a}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.gd}</TableCell>
                    <TableCell numeric className={classes.dense}>{team.pts}</TableCell>
                    <TableCell numeric className={classes.dense}>{displayForm(team.form)}</TableCell>
                </TableRow>
        )
    }
};

const styles = (theme)=>({
    
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    drew:{
        backgroundColor: 'grey',
        width:12,
        height:12,
        marginLeft:-4,
        float:'left',
    },
    lost:{
        backgroundColor: 'red',
        width:12,
        height:12,
        marginLeft:-4,
        float:'left',
    },
    won:{
        backgroundColor: 'green',
        width:12,
        height:12,
        marginLeft:-4,
        float:'left',
    },
    dense:{
        padding:`4px 12px 4px 12px`,
    },
    divide:{
        borderLeft: '1px solid black',
        padding:`4px 12px 4px 12px`,
    },
  })

export default withStyles(styles)(TableDataRow); ;