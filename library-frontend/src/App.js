import React, {useState, useEffect} from 'react'
import bookService from './services/authors'
import loginService from './services/login'
import userService from './services/users'
import Authors from './components/Authors'
import Books from './components/Books'
import ShowAuthor from './components/ShowAuthor'
import ShowBook from './components/ShowBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const App = () => {
	const [page, setPage] = useState("login")
	const [authors, setAuthors] = useState([])
	const [newBook, setNewBook] = useState("")
	const [dropAuthor, setDropAuthor] = useState(["Select Author"])
	const [dropBook, setDropBook] = useState(["Select Book"])
	const [editAuthor, setEditAuthor] = useState("")
	const [newAuthor, setNewAuthor] = useState("")
	const [newIsbn, setNewIsbn] = useState("")
	const [published, setPublished] = useState("Select Year")
	const [genre, setGenre] = useState("")
	const [editing, setEditing] = useState(0)
	const [authorid, setAuthorid] = useState(0)
	const [bookid, setBookid] = useState(0)
	const [username, setUsername] = useState('') 
	const [password, setPassword] = useState('') 
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [user, setUser] = useState(null)
	const [notif, setNotif] = useState(null)

	useEffect(() => {
		bookService
		.getAll()
		.then(response => {
			setAuthors(response.data)
			})
		.catch((error)=>{
			console.log(error)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
		  const user = JSON.parse(loggedUserJSON)
		  setUser(user)
		  setPage("authors")
		}
	  }, [])

	if(authors.length === 0){
		return (
			<div>
			<Notification notif={notif}/>
				<Container maxWidth="sm">
					<Box my={30} textAlign="center">
						<Typography variant="h2" component="h1" gutterBottom >
							Network 404 Error
						</Typography>
					</Box>
				</Container>
			</div>
		);
	}

	const is_isbn13 = (n) =>{
		//validating isbn
		n = n.replace('-','').replace(' ', '')
		n = Array.from(n)
		var last = n.pop()

		if (n.length !== 12)
			return false
		let sum = 0
		for (let i = 0; i < n.length; i++) {
			sum += (i % 2 * 2 + 1) * parseInt(n[i], 10);
		}
		let check = String(10 - (sum % 10));
		if (check === 10) {
			check = "0";
		}

		if (check === last) {
			return true
		} else {
			return false
		} 
	}

  // Login in and register functions
	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})
			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			) 
			setUser(user)
			setUsername('')
			setPassword('')
			setPage("authors")
			setNotif('Logged In!!')
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		} catch (error) {
			setUsername('')
			setPassword('')
			setNotif(error.response.data.error)
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}
	}

	const handleLogout = () => {
		setUser(null)
		setPage("login")
		window.localStorage.removeItem('loggedUser')
	}

	const handleRegister = async (event) => {
		event.preventDefault()
		try {
			await userService.register({
				username, password, email, phone
		})
			setUsername('')
			setPassword('')
			setPhone("")
			setEmail("")
			setNotif('Registered succesfully! Log in to continue')
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		} catch (error) {
			setUsername('')
			setPassword('')
			setPhone("")
			setEmail("")
			setNotif(error.response.data.error)
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}
	}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Author helper components

  	//Adding only author
	const addAuthor = async () => {

		const authorObject = {
			id: authors.length + 1,
			name: newAuthor,
			books:[]
		}
		try{
			await bookService.create(authorObject)
			setAuthors(authors.concat(authorObject))
			setNewAuthor('')
		}catch(error){
			setNotif(error.response.data.error)
			setTimeout(() => {
				setNotif(null)
			}, 3000)
			return false
		}

	}

  	//Editing name of author
	const changeAuthor = async (event) => {
		event.preventDefault()
		const temp = authors.find(author => author.id === editing) //because editing changes to author id
		const authorObject = {
			id: editing,
			name: editAuthor,
			books:temp.books
		}

		try{
			await bookService.update(authorObject.id, authorObject)
			setAuthors(authors.map(author => author.id !== temp.id? author : authorObject))
			setEditAuthor("")
			setEditing(0)
		}catch(error){
			setNotif(error.response.data.error)
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}
	}
    
    //when not changing author name
	const dontChangeAuthor = (event) => {
		event.preventDefault()
		setEditing(0)
		setEditAuthor("")
	}

  	//deleting author from database
  	const deleteAuthor = async (id) => {
		const todelete = authors.find(author => author.id === id)
		try{
			await bookService.remove(id, todelete)
				setAuthors(authors.filter(author => author.id !== id))
		}catch(error){
			setNotif(error.response.data.error)
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}
  	}
  ///////////////////////////////////////////////////////////////////////////////////////
  //changing pages
  	const authorPage = (id) => {
		setPage("showAuthor")
		setAuthorid(id)
	}

	const bookPage = (id) => {
		setPage("showBook")
		setBookid(id)
	}

  //////////////////////////////////////////////////////////////////////////////////
  //Book helper components

  //adds book with name, genre, published, author, ISBN
  	const addBook = () => {
		//to check if isbn already exists
		var repeats = false
		authors.forEach(author => author.books.forEach(book => {
			if(book[Object.entries(book).flat()[0]][0].ISBN === newIsbn){
				repeats = true
			}
		}))
		if(!is_isbn13(newIsbn) || dropAuthor==="Select Author" || !newBook || published==="Select Year" || !genre || repeats){
			setNewBook('')
			setDropAuthor('Select Author')
			setNewIsbn('')
			setGenre("")
			setPublished("Select Year")
			setNotif('Invalid input')
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}else{
			const temp = authors.find(author => author.name === dropAuthor)
			const toappend = {}
			toappend[newBook] = [
				{
					"ISBN": newIsbn,
					"Published": published,
					"Genre": genre
				}
			]
			
			const bookObject = {
				"id": temp.id,
				"name": temp.name,
				"books": [...temp.books, toappend]
			}
	
			bookService
				.update(temp.id, bookObject)
				.then(response => {
					setAuthors(authors.map(author => author.id !== temp.id? author : response.data ))
					setNewBook('')
					setDropAuthor('Select Author')
					setNewIsbn('')
					setGenre("")
					setPublished("Select Year")
				})
		}
 	}

  	//updates book info
  	const editBook = async (num) => {
		//to check if isbn already exists
		var repeats = false
		authors.forEach(author => author.books.forEach(book => {
			if(book[Object.entries(book).flat()[0]][0].ISBN === newIsbn && book[Object.entries(book).flat()[0]][0].ISBN !== num ){
				repeats = true
			}
		}))

		if(!is_isbn13(newIsbn) || dropAuthor==="Select Author" || dropBook==="Select Book" || published==="Select Year" || !genre || repeats){
			setDropBook('Select Book')
			setDropAuthor('Select Author')
			setNewIsbn('')
			setGenre("")
			setPublished("Select Year")
			setNotif('Invalid input')
			setTimeout(() => {
				setNotif(null)
			}, 3000)
		}else{
			//to find position of book in author object
			var pos = []
			const temp = authors.map(author => author.books.map(book => Object.entries(book).flat()[0] === dropBook )) //returns true false array 
			for (let i=0;i<temp.length;i++){
				for (let j=0;j<temp[i].length;j++){
					if (temp[i][j]){
						pos = pos.concat(i,j)
					}
				}	
			}
			//removing book entry from original author
			const original = authors.find(author => author.id === pos[0]+1)
			original.books.splice(pos[1], 1)
			const originalID = original.id
			
			const final=authors.map(author => author.id === original.id? original:author) // json without original entry 
	
			//adding to new author
			const temp3 = authors.find(author => author.name === dropAuthor)
	
			const toappend = {}
			toappend[dropBook] = [
				{
					"ISBN": newIsbn,
					"Published": published,   
					"Genre": genre
				}
			]
	
			const bookObject = {
				"id": temp3.id,
				"name": dropAuthor,
				"books": [...temp3.books, toappend]
			}
	
			const object = final.map(author => author.id === bookObject.id? bookObject:author)
	
			await bookService
					.update(originalID, original)
					.then(response => {
						setDropBook('Select Book')
						setDropAuthor('Select Author')
						setNewIsbn('')
						setGenre("")
						setPublished("Select Year")
					})
			await bookService
					.update(bookObject.id, bookObject)
					.then(response =>{
						setAuthors(object)
					})
		}
  	}

	//deleting book
  	const deleteBook = (name) => {
		var pos = []
		const temp = authors.map(author => author.books.map(book => Object.entries(book).flat()[0] === name ))
		for (let i=0;i<temp.length;i++){
			for (let j=0;j<temp[i].length;j++){
				if (temp[i][j]){
					pos = pos.concat(i,j)
				}
			}
		}
		//removing book entry from original author
		const original = authors.find(author => author.id === pos[0]+1)
		original.books.splice(pos[1], 1)
		const originalID = original.id

		const final=authors.map(author => author.id === originalID? original:author)

		bookService
			.update(originalID, original)
			.then(response => {
				setAuthors(final)
			})
  	}
/////////////////////////////////////
  	const handle = (func, val) => {
		const setters = {
		"setPage": setPage,
		"setEditAuthor": setEditAuthor,
		"setEditing": setEditing,
		"setNewAuthor": setNewAuthor,
		"setNewBook": setNewBook,
		"setDropAuthor": setDropAuthor,
		"setNewIsbn": setNewIsbn,
		"setPublished": setPublished,
		"setGenre": setGenre,
		"setDropBook": setDropBook,
		"setUsername": setUsername,
		"setPassword": setPassword,
		"setEmail": setEmail,
		"setPhone": setPhone
		};
		const setter = setters[func]
		setter(val)
	}

  return (
    <div>
		<Notification notif={notif}/>
		<LoginForm
			page={page}
			username={username}
			email={email}
			phone={phone}
			password={password}
			handleLogin={handleLogin}
			handleRegister={handleRegister}
			handle={handle}
		/>
		<Authors
			user={user}
			page={page}
			authors={authors}
			editing={editing}
			editAuthor={editAuthor}
			changeAuthor={changeAuthor}
			dontChangeAuthor={dontChangeAuthor}
			authorPage={authorPage}
			deleteAuthor={deleteAuthor}
			addAuthor={addAuthor}
			newAuthor={newAuthor}
			handle={handle}
			handleLogout={handleLogout}
		/>
		<Books 
			user={user}
			page={page}
			authors={authors}
			bookPage={bookPage}
			deleteBook={deleteBook}
			addBook={addBook}
			newBook={newBook}
			dropAuthor={dropAuthor}
			newIsbn={newIsbn}
			published={published}
			genre={genre}
			editBook={editBook}
			dropBook={dropBook}
			handle={handle}
			handleLogout={handleLogout}
		/>
		<ShowAuthor
			user={user}
			id={authorid}
			page={page}
			authors={authors}
			bookPage={bookPage}
			handleLogout={handleLogout}
			handle={handle}
		/>
		<ShowBook 
			user={user}
			id={bookid}
			page={page}
			authors={authors}
			authorPage={authorPage}
			handleLogout={handleLogout}
			handle={handle}
		/>
    </div>
  )
}

export default App;
