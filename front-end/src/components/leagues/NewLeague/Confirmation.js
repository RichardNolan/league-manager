import React, { Fragment } from 'react';
// import LeagueTable from '../../tables/LeagueTable'
import { Grid, TableCell, Table, TableHead, TableRow, TableBody, Typography, withStyles, Paper } from '@material-ui/core';



const Confirmation = (props) => {
    let divisions = Object.keys(props.divisionsObject).map((d, index)=>(
        <Fragment key={index}>
            <Grid item md={3} xs={4} >
                <Typography variant='title'>{d}</Typography>
                <Paper>
                    {/* TO-DO - COULD I REPLACE ALL THIS WITH LEAGUE TABLE AGAIN NOW THAT I HAVE A FALLBACK? */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Team</TableCell>
                                <TableCell>Pts</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.divisionsObject[d].map((t,index)=>(
                                <TableRow className={props.classes.row} key={index}>
                                    <TableCell component="th" scope="row">{t.title}</TableCell>
                                    <TableCell>0</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Fragment>
    ))
    return (
        <Grid container spacing={16}>
            {divisions}
        </Grid>
    );
};

const styles = (theme)=>({
    
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
})

export default withStyles(styles)(Confirmation);
