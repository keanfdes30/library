import React, { useState } from 'react'
import Switch from './Switch'
import AddAuthorForm from './AddAuthor'
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
import Input from '@material-ui/core/Input';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import UseStyles from './Styles'
import Copyright from './Copyright'

const Authors = ({user, page, authors,editing, editAuthor, changeAuthor, dontChangeAuthor, authorPage, deleteAuthor, addAuthor, newAuthor, handle, handleLogout }) => {
	const [form, setForm] = useState(false)
	const classes = UseStyles(); 

	if (page !== "authors" )
		return null

	const formCheck = (event) => {
		event.preventDefault()
		addAuthor()
		setForm(false)
	}

	const toggle = event => {
		event.preventDefault()
		setForm(false)
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
                Authors
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
              {authors.map((author) => {
                var booknames = [];
                for (var i = 0; i < author.books.length; i++) {
                  booknames.push(Object.entries(author.books[i]).flat()[0]);
                }
                return(
                  <Grid item key={author.id} xs={12} sm={6} md={4}>
					<Card className={classes.card}>
						<CardMedia
						className={classes.cardMedia}
						image="https://source.unsplash.com/random"
						title="Image title"
						/>
						<CardContent className={classes.cardContent}>
							<Typography gutterBottom variant="h5" component="h2">
								{editing === author.id? 
								( 	<div>
										<Input
											variant="outlined"
											margin="dense"
											required
											fullWidth
											id="edit author"
											label="Author Name"
											name="edit author"
											autoComplete="edit author"
											autoFocus
											value={editAuthor} 
											onChange={(event) => handle("setEditAuthor",event.target.value) }
										/>
										<Button size="small" color="primary"  onClick={changeAuthor}><CheckIcon /></Button>
										<Button size="small" color="primary" onClick = {dontChangeAuthor}><CloseIcon /></Button>
									</div>
								)
									:
								( <div>{author.name}</div>)                        
								}
							</Typography>
							<Typography component="div">
								{booknames.map(book =>{
									return(
										<div key = {booknames.indexOf(book)}>
											{book}
										</div>
									)
								})}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small" color="primary" onClick={()=>authorPage(author.id)}>
								View
							</Button>
							<Button size="small" color="primary" onClick = {()=> handle("setEditing",author.id)}>
								Edit
							</Button>
							<Button size="small" color="primary" onClick={() => deleteAuthor(author.id)}>
								Delete
							</Button>
						</CardActions>
					</Card>
                </Grid>
                )
              })}
            </Grid>
          </Container>
		  	<Grid item xs={12} style={{ textAlign:'center'}}>
				<Button variant="contained" color="primary" alignitems="center" onClick={() => setForm(true)}>
					+
				</Button>
			</Grid>
		  <AddAuthorForm 
			newAuthor={newAuthor}
			handle={handle}
			addAuthor={addAuthor}
			form={form}
			formCheck={formCheck}
      		toggle={toggle}
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

export default Authors;