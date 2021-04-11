import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from './Switch'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import AddBookForm from './AddBooks'
import EditBookForm from './EditBooks';
import UseStyles from './Styles'
import Copyright from './Copyright'


//Books main components
const Books = ({user, page, authors, bookPage, deleteBook, addBook, newBook, dropAuthor, newIsbn, published, genre, editBook, dropBook, handle, handleLogout}) => {
    const [form, setForm] = useState(false)
    const [form1, setForm1] = useState(false)

    const classes = UseStyles();  
    if (page !== "books" )
        return null

    const formCheck = (event) => {
        event.preventDefault()
        addBook()
        setForm(false)
    }

    const formCheck1 = (psn,event) => {
        event.preventDefault()
        editBook(psn)
        setForm1(false)
    }

    const toggle = (event) => {
        event.preventDefault()
        setForm(false)
    }
    const toggle1 = (event) => {
        event.preventDefault()
        setForm1(false)
    }

    var years = []
    for (let i=1999; i<2021; i++){
        years = years.concat(i)
    }
   return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <LocalLibraryIcon className={classes.icon} />
			<Grid item xs={12} sm={6} style={{textAlign:'start'}}>
        		<Link color="inherit" href="#" onClick = {()=>handle("setPage","authors")}>
          			CENTRAL LIBRARY
				</Link>
			</Grid>
			<Grid item xs={12} sm={6} style={{textAlign:'end'}}>
      			<div>{user.username}</div>
				<Button variant="contained" color="primary" onClick={() => handleLogout()}>
            		Logout
        		</Button>
			</Grid>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                CENTRAL LIBRARY
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Books
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Switch
                    handle = {() => handle("setPage",'authors')}
                    name = {"Authors"}
                  />
                  <Switch
                    handle = {() => handle("setPage",'books')}
                    name = {"Books"}
                  />
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {authors.map(author =>author.books.map(book => {
                    var temp = Object.entries(book).flat()[0];  //book name
                    return(
                        <Grid item key={book[temp][0].ISBN} xs={12} sm={6} md={4}>
                            <Card className={classes.card} key={book[temp][0].ISBN}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {temp}
                                    </Typography>
                                    <Typography>
                                        {author.name}
                                    </Typography>
                                    <Typography>
                                        {book[temp][0].Published}
                                    </Typography>
                                    <Typography>
                                        {book[temp][0].Genre}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => bookPage(book[temp][0].ISBN)}>
                                        View
                                    </Button>
                                    <Button size="small" color="primary" onClick={() => setForm1(true)}>
                                        Edit
                                    </Button>
                                    <Button size="small" color="primary" onClick={()=>deleteBook(temp)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }))}
            </Grid>
          </Container>
            <Grid item xs={12} style={{ textAlign:'center'}}>
				<Button variant="contained" color="primary" alignitems="center" onClick={() => setForm(true)}>
					+
				</Button>
			</Grid>
            <AddBookForm 
                dropAuthor={dropAuthor}
                handle={handle}
                addBook={addBook}
                newBook={newBook}
                newIsbn={newIsbn}
                genre={genre}
                published={published}
                years={years}
                authors={authors}
                formCheck={formCheck}
                form={form}
                toggle={toggle}
            />            
            <EditBookForm
                dropBook={dropBook}
                dropAuthor={dropAuthor}
                handle={handle}
                newIsbn={newIsbn}
                genre={genre}
                published={published}
                years={years}
                authors={authors}
                formCheck1={formCheck1}
                form1={form1}
                toggle1={toggle1}
            />
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Central Library
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            20 Level Street, Indiranagar, Bangalore
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
}

export default Books;