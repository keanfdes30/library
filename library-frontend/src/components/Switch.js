import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Switch = ({handle, name}) => {

    return(
        <Grid item>
            <Button variant="contained" color="primary" onClick={handle}>
                {name}
            </Button>
        </Grid>
    )
};

export default Switch