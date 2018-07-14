import React, { Fragment } from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const TableHeadings = (props)=>{
    
    let {size} = props

    if(size>=0 && size<4){
        return(
            <TableHead>
                <TableRow>
                    <TableCell>Team</TableCell>
                    {size>0 && (
                        <Fragment>
                            <TableCell>P</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>L</TableCell>
                        </Fragment>
                    )}
                    {size===2 && <TableCell>GD</TableCell>}
                    {size>2 && (
                        <Fragment>
                            <TableCell>F</TableCell>
                            <TableCell>A</TableCell>
                            <TableCell>GD</TableCell>
                        </Fragment>
                    )}
                    <TableCell>Pts</TableCell>
                </TableRow>
            </TableHead>
        )
    }else{
        return(
            <TableHead>
                <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={8}>Home</TableCell>
                    <TableCell colSpan={8} className={props.classes.divide}>Away</TableCell>
                    <TableCell colSpan={8} className={props.classes.divide}>Total</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell numeric>P</TableCell>
                    <TableCell numeric>W</TableCell>
                    <TableCell numeric>D</TableCell>
                    <TableCell numeric>L</TableCell>
                    <TableCell numeric>F</TableCell>
                    <TableCell numeric>A</TableCell>
                    <TableCell numeric>GD</TableCell>
                    <TableCell numeric>Pts</TableCell>
                    <TableCell numeric className={props.classes.divide}>P</TableCell>
                    <TableCell numeric>W</TableCell>
                    <TableCell numeric>D</TableCell>
                    <TableCell numeric>L</TableCell>
                    <TableCell numeric>F</TableCell>
                    <TableCell numeric>A</TableCell>
                    <TableCell numeric>GD</TableCell>
                    <TableCell numeric>Pts</TableCell>
                    <TableCell numeric className={props.classes.divide}>P</TableCell>
                    <TableCell numeric>W</TableCell>
                    <TableCell numeric>D</TableCell>
                    <TableCell numeric>L</TableCell>
                    <TableCell numeric>F</TableCell>
                    <TableCell numeric>A</TableCell>
                    <TableCell numeric>GD</TableCell>
                    <TableCell numeric>Pts</TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

const styles = {
    divde:{
        color:'red'
    }
}


// export default TableHeadings;
export default withStyles(styles)(TableHeadings);