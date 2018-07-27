import React from 'react';
// import LeagueTable from '../../tables/LeagueTable'
import { Grid, TableCell, Table, TableHead, TableRow, TableBody, Typography, withStyles } from '@material-ui/core';



const Confirmation = (props) => {

    let divisionsObject = props.divisionsObject 

    let divisions = Object.keys(divisionsObject).map((d, index)=>(
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Typography variant='title'>{d}</Typography>           
                {/* TO-DO - I COULD REPLACE ALL THIS WITH LEAGUE TABLE AGAIN NOW THAT IT HAS A FALLBACK? */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={props.classes.dense}>Team</TableCell>
                            <TableCell numeric className={props.classes.dense}>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {divisionsObject[d].map((t,index)=>(
                            <TableRow className={props.classes.row} key={index}>
                                <TableCell className={props.classes.dense} component="th" scope="row">{t.title}</TableCell>
                                <TableCell numeric className={props.classes.dense}>0</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </Grid>
    ))
    return (
        <Grid container spacing={32}>
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
    dense:{
        padding:`4px 12px 4px 12px`,
    },
})

export default withStyles(styles)(Confirmation);
