import React, { Fragment } from 'react';
import { TableRow, TableCell, Avatar } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const TableDataRow = (props) => {
    
    let {size, team, classes} = props

    const displayForm = fStr =>{
        return fStr.split('').slice(-5).map((f, key)=>{
            if(f==="0")return <Avatar className={classes.lost} key={key}></Avatar>
            if(f==="1")return <Avatar className={classes.drew} key={key}></Avatar>
            if(f==="3")return <Avatar className={classes.won} key={key}></Avatar>
        })

    }

    if(size>=0 && size<4){
        return(
                <TableRow className={props.classes.row}>
                    <TableCell component="th" scope="row">{team.title || team.team}</TableCell>
                    {size>0 && (
                        <Fragment>
                            <TableCell numeric>{team.p}</TableCell>
                            <TableCell numeric>{team.w}</TableCell>
                            <TableCell numeric>{team.d}</TableCell>
                            <TableCell numeric>{team.l}</TableCell>
                        </Fragment>
                    )}
                    {size===2 && <TableCell numeric>{team.gd}</TableCell>}
                    {size>2 && (
                        <Fragment>
                            <TableCell numeric>{team.f}</TableCell>
                            <TableCell numeric>{team.a}</TableCell>
                            <TableCell numeric>{team.gd}</TableCell>
                        </Fragment>
                    )}
                    <TableCell numeric>{team.pts}</TableCell>
                </TableRow>
        )
    }else{

        return(
        
                <TableRow className={props.classes.row}>
                    <TableCell component="th" scope="row">{team.team || team.title}</TableCell>
                    <TableCell numeric>{team.hp}</TableCell>
                    <TableCell numeric>{team.hw}</TableCell>
                    <TableCell numeric>{team.hd}</TableCell>
                    <TableCell numeric>{team.hl}</TableCell>
                    <TableCell numeric>{team.hf}</TableCell>
                    <TableCell numeric>{team.ha}</TableCell>
                    <TableCell numeric>{team.hgd}</TableCell>
                    <TableCell numeric>{team.hpts}</TableCell>
                    <TableCell numeric>{displayForm(team.hform)}</TableCell>
                    <TableCell numeric>{team.ap}</TableCell>
                    <TableCell numeric>{team.aw}</TableCell>
                    <TableCell numeric>{team.ad}</TableCell>
                    <TableCell numeric>{team.al}</TableCell>
                    <TableCell numeric>{team.af}</TableCell>
                    <TableCell numeric>{team.aa}</TableCell>
                    <TableCell numeric>{team.agd}</TableCell>
                    <TableCell numeric>{team.apts}</TableCell>
                    <TableCell numeric>{displayForm(team.aform)}</TableCell>
                    <TableCell numeric>{team.p}</TableCell>
                    <TableCell numeric>{team.w}</TableCell>
                    <TableCell numeric>{team.d}</TableCell>
                    <TableCell numeric>{team.l}</TableCell>
                    <TableCell numeric>{team.f}</TableCell>
                    <TableCell numeric>{team.a}</TableCell>
                    <TableCell numeric>{team.gd}</TableCell>
                    <TableCell numeric>{team.pts}</TableCell>
                    <TableCell numeric>{displayForm(team.form)}</TableCell>
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
    }
  })

export default withStyles(styles)(TableDataRow); ;