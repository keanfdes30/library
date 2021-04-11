import React from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import UseStyles from './Styles'

const AddAuthorForm = ({newAuthor, handle, formCheck, form, toggle}) => {
    const classes = UseStyles();  
    if(!form)
        return null

    return(
        <div>
            <Grid item xs={12} className={classes.grid} style={{ textAlign:'center',alignItems: "top"}}>
                <Button variant="contained" color="primary" onClick={toggle} >
                    -
                </Button>
            </Grid>
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <form className={classes.form} noValidate onSubmit={formCheck}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="add author"
                        label="Name"
                        name="add author"
                        autoComplete="add author"
                        autoFocus
                        value={newAuthor}
                        onChange={(event) => handle("setNewAuthor",event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Add Author
                    </Button>
                </form>
            </Container>
            </div>
        </div>
    )
}

export default AddAuthorForm;