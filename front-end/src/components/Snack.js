import React from 'react';
import { Snackbar } from '@material-ui/core';
import SNACK from '../SNACK'

const Snack = ()=>(

    <SNACK.Consumer>
        { ({hideSnack, snack})=>(
            <Snackbar
                anchorOrigin={{vertical:'top', horizontal:'center'}}
                open={snack.show}
                onClose={hideSnack}
                autoHideDuration={3000}
                message={snack.message}
            />
        ) }
    </SNACK.Consumer>
);



export default Snack;