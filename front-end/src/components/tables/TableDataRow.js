import React, { Fragment } from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const styles = (theme)=>({
    divide:{

    }
})
const TableDataRow = (props) => {
    
    let {size, team} = props

    if(size>=0 && size<4){
        return(
                <TableRow>
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
        
                <TableRow>
                    <TableCell component="th" scope="row">{team.team || team.title}</TableCell>
                    <TableCell numeric>{team.hp}</TableCell>
                    <TableCell numeric>{team.hw}</TableCell>
                    <TableCell numeric>{team.hd}</TableCell>
                    <TableCell numeric>{team.hl}</TableCell>
                    <TableCell numeric>{team.hf}</TableCell>
                    <TableCell numeric>{team.ha}</TableCell>
                    <TableCell numeric>{team.hgd}</TableCell>
                    <TableCell numeric>{team.hpts}</TableCell>
                    <TableCell numeric className={props.classes.divide}>{team.ap}</TableCell>
                    <TableCell numeric>{team.aw}</TableCell>
                    <TableCell numeric>{team.ad}</TableCell>
                    <TableCell numeric>{team.al}</TableCell>
                    <TableCell numeric>{team.af}</TableCell>
                    <TableCell numeric>{team.aa}</TableCell>
                    <TableCell numeric>{team.agd}</TableCell>
                    <TableCell numeric>{team.apts}</TableCell>
                    <TableCell numeric className={props.classes.divide}>{team.p}</TableCell>
                    <TableCell numeric>{team.w}</TableCell>
                    <TableCell numeric>{team.d}</TableCell>
                    <TableCell numeric>{team.l}</TableCell>
                    <TableCell numeric>{team.f}</TableCell>
                    <TableCell numeric>{team.a}</TableCell>
                    <TableCell numeric>{team.gd}</TableCell>
                    <TableCell numeric>{team.pts}</TableCell>
                </TableRow>
        )
    }
};

export default withStyles(styles)(TableDataRow); ;