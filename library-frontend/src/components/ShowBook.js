import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import UseStyles from './Styles'
import Copyright from './Copyright'

const ShowBook = ({user, id, page, authors, authorPage, handleLogout, handle}) => {
  	const classes = UseStyles(); 
    if (page !== "showBook")
      return null

    var object = ""
    var name = ""
    var writer = ""
    authors.forEach(author => author.books.forEach(book =>
      {if( book[Object.entries(book).flat()[0]][0].ISBN === id){
        object=book;
        name = Object.entries(book).flat()[0]
        writer = author
      }}
    ))

	return (
		<React.Fragment>
		  <CssBaseline />
		  <AppBar position="relative">
			<Toolbar>
			  <LocalLibraryIcon className={classes.icon} />
			  <Grid item xs={12} sm={6} style={{textAlign:'start'}} >
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
				  {name.toUpperCase()}
				</Typography>
			  </Container>
			</div>
			<Container className={classes.cardGrid} maxWidth="md">
			  	{/* End hero unit */}
			  	<Grid container spacing={4}>
					<Grid item xs={12} sm={6} md={4}>
						<CardActionArea onClick={()=>authorPage(writer.id)}>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image="https://source.unsplash.com/random"
								title="Image title"
							/>
							<CardContent className={classes.cardContent}>
								<Typography gutterBottom variant="h5" component="h2">
									{writer.name}
								</Typography>
								<Typography>
									ISBN: {object[name][0].ISBN}
								</Typography>
								<Typography>
									Published: {object[name][0].Published}
								</Typography>
								<Typography>
									Genre: {object[name][0].Genre}
								</Typography>
							</CardContent>
						</Card>
						</CardActionArea>
					</Grid>
			 	 </Grid>
			</Container>
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

export default ShowBook;