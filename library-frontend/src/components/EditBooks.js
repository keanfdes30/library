import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'bootstrap/dist/css/bootstrap.min.css';
import UseStyles from './Styles'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const EditBookForm = ({handle, form1, dropBook, dropAuthor, newIsbn, genre, published, years, authors, formCheck1, toggle1 }) => {
    const classes = UseStyles();  
    const [book, setBook] = useState("")

    if(!form1)
        return null

    return(
        <div>
        <Grid item xs={12} className={classes.grid} style={{ textAlign:'center',alignItems: "top"}}>
            <Button variant="contained" color="primary" onClick={toggle1} >
                -
            </Button>
        </Grid>
        <div className={classes.heroContent}>
        <Container maxWidth="sm">
        <form className={classes.form} noValidate onSubmit={event=>formCheck1(book,event)}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Book</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dropBook}>
                    <MenuItem key="1" value={"Select Book"} onClick={()=> handle("setDropBook","Select Book")}>Select Book</MenuItem>
                    {authors.map(author => author.books.map(book =>{
                        var temp = Object.entries(book).flat()[0];
                        return <MenuItem key={book[temp][0].ISBN} value={temp} onClick={()=>{handle("setDropBook",temp);setBook(book[temp][0].ISBN)}}>{temp}</MenuItem>
                    }))}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Author</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dropAuthor}>
                    <MenuItem key="1" value={"Select Author"} onClick={()=> handle("setDropAuthor","Select Author")}>Select Author</MenuItem>
                    {authors.map(author => {
                        return <MenuItem key={author.id} value={author.name} onClick={()=> handle("setDropAuthor", author.name)}>{author.name}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="isbn"
                label="Input ISBN"
                name="isbn"
                autoComplete="isbn"
                autoFocus
                value={newIsbn}
                onChange={(event) => handle("setNewIsbn",event.target.value)}
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Published Year</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" value={published}>
                    <MenuItem key="1" value={"Select Year"} onClick={()=> handle("setPublished","Select Year")}>Select Year</MenuItem>
                    {years.map(year => {
                        return <MenuItem key={year} value={year} onClick={()=> handle("setPublished", year)}>{year}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="genre"
                label="Genre"
                name="genre"
                autoComplete="genre"
                autoFocus
                value={genre}
                onChange={(event) => handle("setGenre",event.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Edit Book
            </Button>
        </form>
        </Container>
    </div>    
    </div>
    )
}    

export default EditBookForm;