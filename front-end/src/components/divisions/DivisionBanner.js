import React from 'react';
import {Link} from 'react-router-dom'
import {Typography, withStyles} from '@material-ui/core'
const DivisionBanner = (props) => {
    let resultHeading = (props.division && <Link to={`/division/${props.division._id}`} >{props.division.title}</Link>) || 'Loading...'

    return (
        <div>            
            <Typography variant='headline' gutterBottom>
                        {resultHeading}
            </Typography>
        </div>
    );
};

const styles = {

}


export default withStyles(styles)(DivisionBanner);