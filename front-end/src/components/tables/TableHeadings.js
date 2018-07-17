import React, { Fragment } from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'

const TableHeadings = (props)=>{
    
    let {size, classes} = props

    if(size>=0 && size<4){
        return(
            <TableHead>
                <TableRow>
                    <TableCell className={classes.dense}>Team</TableCell>
                    {size>0 && (
                        <Fragment>
                            <TableCell numeric className={classes.dense}>P</TableCell>
                            <TableCell numeric className={classes.dense}>W</TableCell>
                            <TableCell numeric className={classes.dense}>D</TableCell>
                            <TableCell numeric className={classes.dense}>L</TableCell>
                        </Fragment>
                    )}
                    {size===2 && <TableCell numeric className={classes.dense}>GD</TableCell>}
                    {size>2 && (
                        <Fragment>
                            <TableCell numeric className={classes.dense}>F</TableCell>
                            <TableCell numeric className={classes.dense}>A</TableCell>
                            <TableCell numeric className={classes.dense}>GD</TableCell>
                        </Fragment>
                    )}
                    <TableCell numeric className={classes.dense}>Pts</TableCell>
                </TableRow>
            </TableHead>
        )
    }else{
        return(
            <TableHead>
                <TableRow>
                    <TableCell className={classes.dense}>&nbsp;</TableCell>
                    <TableCell colSpan={9} className={props.classes.divide}>Home</TableCell>
                    <TableCell colSpan={9} className={props.classes.divide}>Away</TableCell>
                    <TableCell colSpan={9} className={props.classes.divide}>Total</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.dense}>Team</TableCell>
                    <TableCell numeric className={classes.divide}>P</TableCell>
                    <TableCell numeric className={classes.dense}>W</TableCell>
                    <TableCell numeric className={classes.dense}>D</TableCell>
                    <TableCell numeric className={classes.dense}>L</TableCell>
                    <TableCell numeric className={classes.dense}>F</TableCell>
                    <TableCell numeric className={classes.dense}>A</TableCell>
                    <TableCell numeric className={classes.dense}>GD</TableCell>
                    <TableCell numeric className={classes.dense}>Pts</TableCell>
                    <TableCell numeric className={classes.dense}>Form</TableCell>
                    <TableCell numeric className={classes.divide}>P</TableCell>
                    <TableCell numeric className={classes.dense}>W</TableCell>
                    <TableCell numeric className={classes.dense}>D</TableCell>
                    <TableCell numeric className={classes.dense}>L</TableCell>
                    <TableCell numeric className={classes.dense}>F</TableCell>
                    <TableCell numeric className={classes.dense}>A</TableCell>
                    <TableCell numeric className={classes.dense}>GD</TableCell>
                    <TableCell numeric className={classes.dense}>Pts</TableCell>
                    <TableCell numeric className={classes.dense}>Form</TableCell>
                    <TableCell numeric className={classes.divide}>P</TableCell>
                    <TableCell numeric className={classes.dense}>W</TableCell>
                    <TableCell numeric className={classes.dense}>D</TableCell>
                    <TableCell numeric className={classes.dense}>L</TableCell>
                    <TableCell numeric className={classes.dense}>F</TableCell>
                    <TableCell numeric className={classes.dense}>A</TableCell>
                    <TableCell numeric className={classes.dense}>GD</TableCell>
                    <TableCell numeric className={classes.dense}>Pts</TableCell>
                    <TableCell numeric className={classes.dense}>Form</TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

const styles = {
    divide:{
        borderLeft: '1px solid black',
        padding:`4px 12px 4px 12px`,
    },
    dense:{
        padding:`4px 12px 4px 12px`,
    }
}


// export default TableHeadings;
export default withStyles(styles)(TableHeadings);