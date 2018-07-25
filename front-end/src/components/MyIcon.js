import React from 'react';
import { withStyles, Avatar } from '@material-ui/core';

const MyIcon = (props) => {
    let image = <img src={props.image}  className={classes.image} alt='icon' />
    return (
        <div>
            <Avatar style={{backgroundColor:'transparent'}}>{image}</Avatar>
        </div>
    );
};

const styles={
    image:{
        width:'100%',
        height:'100%',
    }
}
export default withStyles(styles)(MyIcon);